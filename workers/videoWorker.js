require("dotenv").config();
const { Queue, Worker, QueueEvents } = require("bullmq");
const Redis = require("ioredis");
const path = require("path");
const os = require("os");
const fs = require("fs");

const processExcel = require("../utils/processExcel");
const recordWebsite = require("../utils/recordWebsite");
const mergeVideos = require("../utils/mergeVideos");
const uploadToS3 = require("../utils/uploadToS3");
const Video = require("../models/Video");
const User = require("../models/User");
const {
  sendEmailIMAP,
  sendBulkEmails,
  sendEmail,
} = require("../controllers/emailController");
const googlemailSchema = require("../models/googlemailSchema");
const mailSchema = require("../models/mailSchema");
const imapschema = require("../models/imapschema");
const { sendNotification } = require("../services/notificationService");
const { canUploadVideos } = require("../services/subscriptionService");

const maxConcurrency = Math.max(1, os.cpus().length - 1);

let terminationRequested = false;
const terminateFlags = {};




const redisConnection = new Redis(process.env.REDIS_URL, {
  tls: { rejectUnauthorized: false },
  maxRetriesPerRequest: null,
  enableOfflineQueue: true,
  lazyConnect: true, // Connect only when needed
  retryStrategy: (times) => Math.min(times * 50, 2000),
  reconnectOnError: (err) => {
    console.error("❌ Redis Connection Error:", err.message);
    return true; // Auto-reconnect
  },
  maxmemory: "500mb", // Prevent excessive memory usage
  keepAlive: 5000, // Keep connection alive
});

// Optimized Job Queue
const videoQueue = new Queue("videoProcessing", {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: 100, // Keep last 100 jobs for debugging
    removeOnFail: 50, // Store only last 50 failed jobs
    attempts: 1,
    backoff: { type: "exponential", delay: 5000 },
  },
  limiter: {
    max: 5, // Process max 5 jobs per second
    duration: 1000, // Limits Redis command hits
  },
});

const queueEvents = new QueueEvents("videoProcessing", {
  connection: redisConnection,
});
const completedJobs = new Map();

queueEvents.on("completed", async ({ jobId, returnvalue }) => {
  console.log(`✅ Job ${jobId} completed.`);
  console.log("📦 Job Result:", returnvalue);

  if (returnvalue) {
    completedJobs.set(jobId, returnvalue);
    console.log(`✅ Job ${jobId} result stored in completedJobs.`);
  } else {
    console.warn(`⚠️ Job ${jobId} completed but returned no data.`);
  }
});

const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`❌ Error deleting file ${filePath}:`, err);
      else console.log(`🗑️ Deleted file: ${filePath}`);
    });
  }
};


const processWebsites = async (websiteUrls, jobId, userId) => {
  const outputDir = path.join(__dirname, "../uploads/");
  let recordedVideos = [];
  const maxConcurrentTabs = 1; // Ensure it's defined

  const user = await User.findById(userId);
  if (!user || !user.planDetails) {
    console.error(
      `❌ User not found or missing plan details. Skipping job ${jobId}.`
    );
    return [];
  }

  // ✅ Get User's Video Limit Based on Plan
  const PLAN_LIMITS = {
    Trial: 30,
    Starter: 2000,
    Pro: 5000,
    Enterprise: 10000,
  };

  const maxVideos = PLAN_LIMITS[user.planDetails] || 0;
  const usedVideos = user.videosCount || 0;
  let remainingSlots = maxVideos - usedVideos;

  console.log(
    `🎥 User ${user.username} Plan: ${user.planDetails}, Slots Left: ${remainingSlots}`
  );

  if (remainingSlots <= 0) {
    console.warn(
      `🚫 No slots left for user ${user.username}. Skipping recording.`
    );
    return [];
  }

  if (!Array.isArray(websiteUrls) || websiteUrls.length === 0) {
    console.error("❌ No valid website URLs found. Aborting processing.");
    return [];
  }

  // ✅ Ensure valid URLs only
  console.log(
    "🔍 Extracted Websites for processing:",
    JSON.stringify(websiteUrls, null, 2)
  );

  if (!Array.isArray(websiteUrls) || websiteUrls.length === 0) {
    console.error(
      "❌ No valid website URLs found. Double-check Excel parsing."
    );
    return [];
  }

  const limitedWebsiteUrls = (websiteUrls || [])
    .slice(0, remainingSlots)
    .filter((url) => typeof url === "string" && url.startsWith("http")); // Ensure it's a valid string

  console.log(
    "🔍 Websites being processed:",
    JSON.stringify(limitedWebsiteUrls, null, 2)
  );

  if (limitedWebsiteUrls.length === 0) {
    console.error(
      "❌ No valid websites left after filtering. Possible issue with Excel extraction."
    );
    return [];
  }

  console.log("🔍 Websites being processed:", limitedWebsiteUrls);

  for (let i = 0; i < limitedWebsiteUrls.length; i += maxConcurrentTabs) {

    if (terminateFlags[jobId]) {
      console.log(`🛑 Job ${jobId} termination detected. Stopping processing.`);
      break;
    }

    const chunk = limitedWebsiteUrls.slice(i, i + maxConcurrentTabs);
    console.log(`🎥 Processing batch of ${chunk.length} websites...`);

    const chunkResults = await Promise.allSettled(
      chunk
        .filter((webUrl) => webUrl && webUrl.startsWith("http")) // ✅ Prevent undefined URLs
        .map(async (webUrl) => {
          try {
            if (terminationRequested) return null;

            const videoPath = await recordWebsite(webUrl, outputDir);

            console.log(`🔍 Recording result for ${webUrl}:`, videoPath);

            if (!videoPath) {
              console.error(`❌ Recording failed for ${webUrl}`);
              return null;
            }

            return { webUrl, path: videoPath };
          } catch (err) {
            console.error(`❌ Failed to record ${webUrl}:`, err.message);
            return null;
          }
        })
    );

    // ✅ Fix: Filter out failed recordings properly
    const successfullyRecorded = chunkResults
      .filter((r) => r.status === "fulfilled" && r.value?.path)
      .map((r) => r.value);

    if (successfullyRecorded.length === 0) {
      console.error("❌ No successful recordings in this batch.");
    }

    recordedVideos.push(...successfullyRecorded);

    if (successfullyRecorded.length > 0) {
      // 🔹 Get updated user record after incrementing videosCount
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { videosCount: successfullyRecorded.length } },
        { new: true } // Return updated user document
      );

      // 🔹 Correctly recalculate remaining slots after DB update
      const usedVideos = updatedUser.videosCount; // Updated videos count
      remainingSlots = Math.max(
        PLAN_LIMITS[updatedUser.planDetails] - usedVideos,
        0
      );

      console.log(
        `✅ ${successfullyRecorded.length} videos processed. Updated Remaining Slots: ${remainingSlots}`
      );
    }

    if (terminateFlags[jobId]) {
      sendNotification(userId,`🛑 Job ${jobId} stopped after completing batch ${i / maxConcurrentTabs + 1}.`);
      console.log(`🛑 Job ${jobId} stopped after completing batch ${i / maxConcurrentTabs + 1}.`);
      break;
    }
  }

  console.log(`✅ Websites recorded successfully: ${recordedVideos.length}`);
  return recordedVideos;
};
const processJob = async (job) => {
  console.log("📦 Job Data:", job.data);

  try {
    if (terminationRequested) {
      console.log(`🛑 Job ${job.id} skipped due to termination.`);
      return [];
    }

    console.log(`🚀 Processing job ${job.id}...`);
    const { excelFilePath, camVideoPath, userId, folderId } = job.data;

    console.log("📦 Job Data:", job.data);

    console.log(`🎥 Processing job for User: ${userId}`);

    if (!userId) throw new Error("❌ Missing userId in job data.");
    const user = await User.findById(userId);
    if (!user) throw new Error("❌ User not found for job.");

    const videoPreference = user.videoPreference || "storeOnly"; // Default to 'storeOnly'
    console.log(`📌 User Video Preference: ${videoPreference}`);
    const cameraSettings = user.cameraSettings;

    let data = processExcel(excelFilePath);
    console.log("✅ Excel file processed successfully.", data);
    if (!data.length)
      throw new Error("❌ No valid data found in the Excel file.");

    // 🔍 Check user plan and available slots
    const userPlanDetails = await canUploadVideos(userId, data.length);
    console.log("✅ User plan details:", userPlanDetails);

    let availableSlots = userPlanDetails?.remaining ?? 0;

    if (availableSlots <= 0) {
      throw new Error("⛔ No available slots for video processing.");
    }

    // ✅ Slice data once using availableSlots
    const videoLimit = Math.min(availableSlots, data.length);
    const limitedData = data.slice(0, videoLimit);
    console.log(`✅ Adjusted to process ${videoLimit} videos.`);

    console.log(`✅ Final Adjusted videoCount: ${limitedData.length} videos.`);

    const extractedUrls = limitedData
      .map((row) => row["Website-Url"] || row["WebsiteUrl"])
      .filter((url) => url && url.startsWith("http")); // Ensure only valid URLs

    console.log("🔍 Valid extracted URLs:", extractedUrls);

    const recordedVideos = await processWebsites(extractedUrls, job.id, userId);
    if (!recordedVideos.length) throw new Error("❌ No recordings succeeded.");

    const userSuccessfulMerges = {};

    // ✅ Parallel Processing: Merging Videos & Uploading to S3
    const mergedVideos = await Promise.all(
      recordedVideos.map(async ({ webUrl, path: webVideo }, index) => {
        const outputFilePath = `./uploads/merged_${Date.now()}_${index}.mp4`;

        try {
          console.log(`🔄 Merging video for row ${index + 1} (User: ${userId})...`);
          await mergeVideos(webVideo, camVideoPath, outputFilePath, cameraSettings);

          console.log(`☁️ Uploading merged video to S3 for row ${index + 1}...`);
          const s3Url = await uploadToS3(outputFilePath, `merged_${Date.now()}_${index}.mp4`);

          console.log(`✅ Video uploaded to S3: ${s3Url}`);

          // ✅ Store separately for each userId
          if (!userSuccessfulMerges[userId]) {
            userSuccessfulMerges[userId] = [];
          }
          userSuccessfulMerges[userId].push({ rowNumber: index + 1, s3Url, webUrl });

          return { rowNumber: index + 1, s3Url, webUrl };
        } catch (error) {
          console.error(`❌ Error processing row ${index + 1}:`, error.message);
          return null;
        } finally {
          if (fs.existsSync(webVideo)) deleteFile(webVideo);
          if (fs.existsSync(outputFilePath)) deleteFile(outputFilePath);
        }
      })
    );


    // ✅ Filter out failed merges
    const successfulMerges = mergedVideos.filter((video) => video !== null);
    if (!successfulMerges.length)
      throw new Error("❌ No videos successfully processed.");

    // ✅ Fetch Email Configurations in Parallel
    const [googlemail, microsoft, imap] = await Promise.all([
      googlemailSchema.findOne({ userId }).lean(),
      mailSchema.findOne({ userId }).lean(),
      imapschema.findOne({ userId }).lean(),
    ]);

    // ✅ Skip Email Sending if Preference is "storeOnly"
    if (videoPreference !== "storeOnly") {
      for (const { rowNumber, s3Url } of successfulMerges) {
        const matchedRow = limitedData[rowNumber - 1];

        if (!matchedRow?.Email) {
          console.warn(
            `⚠️ No email found for row ${rowNumber}. Skipping email.`
          );
          continue;
        }

        const {
          Email: recipientEmail,
          Name,
          WebsiteUrl,
          ClientCompany,
          ClientDesignation,
        } = matchedRow;
        console.log(
          `📤 Sending email to: ${recipientEmail} (Row: ${rowNumber})`
        );

        try {
          if (googlemail) {
            await sendEmail({
              email: recipientEmail,
              userId,
              s3Url,
              Name,
              WebsiteUrl,
              ClientCompany,
              ClientDesignation,
            });
          } else if (microsoft) {
            await sendBulkEmails({
              email: recipientEmail,
              userId,
              s3Url,
              Name,
              WebsiteUrl,
              ClientCompany,
              ClientDesignation,
            });
          } else if (imap) {
            await sendEmailIMAP({
              email: recipientEmail,
              userId,
              s3Url,
              Name,
              WebsiteUrl,
              ClientCompany,
              ClientDesignation,
            });
          } else {
            console.warn(
              `⚠️ No email service found for user ${userId}. Skipping email.`
            );
          }
        } catch (error) {
          console.error(
            `❌ Error sending email to ${recipientEmail}:`,
            error.message
          );
        }
      }
    } else {
      console.log("📂 Skipping email sending, as user selected 'storeOnly'.");
    }

    // ✅ Store Processed Videos in Database
    const videoRecordsByUser = {};

    for (const [userId, successfulMerges] of Object.entries(userSuccessfulMerges)) {
      videoRecordsByUser[userId] = successfulMerges
        .map(({ rowNumber, s3Url, webUrl }) => {
          const matchedRow = limitedData[rowNumber - 1]; // Ensure correct mapping using rowNumber

          if (!matchedRow) {
            console.warn(`⚠️ No matching row found for rowNumber ${rowNumber}. Skipping.`);
            return null;
          }

          return {
            userId, // Ensure we store the user ID for tracking
            mergedUrl: s3Url,
            websiteUrl: webUrl,
            email: matchedRow.Email || null,
            name: matchedRow.Name || null,
            clientCompany: matchedRow.ClientCompany || null,
            clientDesignation: matchedRow.ClientDesignation || null,
          };
        })
        .filter(Boolean); // Removes null values from the array
    }



    try {
      // Iterate over each user in videoRecordsByUser
      for (const userId in videoRecordsByUser) {
        if (videoRecordsByUser[userId].length === 0) continue; // Skip if no videos

        await Video.findOneAndUpdate(
          { userId, folderId },
          { $push: { videos: { $each: videoRecordsByUser[userId] } } },
          { upsert: true, new: true, }
        );
      }
      console.log("✅ All videos saved successfully!");
    } catch (error) {
      console.error("❌ Error saving videos:", error.message);
      throw error;
    } 

    console.log(`✅ Job in video process ${job.id} completed.`);
    return successfulMerges.length ? successfulMerges : [];
  } catch (error) {
    console.error(`❌ Error in job ${job.id}:`, error.message);
    throw error;
  }
};

let videoWorker = new Worker(
  "videoProcessing",
  async (job) => {
    if (terminationRequested) {
      console.log(`🛑 Job ${job.id} skipped due to termination.`);
      return;
    }

    try {
      const result = await processJob(job);
      console.log(`📢 Worker is returning result for job ${job.id}:`, result);
      return result || [];
    } catch (error) {
      console.error(`❌ Worker failed for job ${job.id}:`, error);
      return [];
    }
  },
  {
    connection: redisConnection,
    concurrency: maxConcurrency,
    lockDuration: 60000,
    removeOnComplete: false,
    removeOnFail: false,
    attempts: 1,
    backoff: { type: "exponential", delay: 5000 },
  }
);

videoWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

const terminateProcessing = async (jobID,userId) => {
  console.log(`🛑 Termination Requested for Job ID: ${jobID}`);
  sendNotification(userId,`🛑 Termination Requested for Job ID: ${jobID}`);

  terminateFlags[jobID] = true; // Mark job as terminated for this specific job

  return { message: `Job ${jobID} termination initiated.` };
};

redisConnection.on("connect", () => console.log("✅ Redis connected!"));
redisConnection.on("error", (err) =>
  console.error("❌ Redis connection error:", err)
);

module.exports = {
  videoQueue,
  videoWorker,
  terminateProcessing,
  completedJobs,
  queueEvents,
};