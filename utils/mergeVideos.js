const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
const ffprobeStatic = require("ffprobe-static");

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const getVideoDuration = (videoPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        return reject(err);
      }
      resolve(metadata.format.duration); // Get duration in seconds
    });
  });
};

const mergeVideos = async (webPath, camPath, outputPath, cameraSettings) => {
  try {
    const camDuration = await getVideoDuration(camPath); // Get overlay video duration

    return new Promise((resolve, reject) => {
      const { position, size } = cameraSettings;

      // Define size scaling based on user preference (increased scale factors)
      let scaleFactor;
      switch (size) {
        case "small":
          scaleFactor = 0.15; // Increased from 0.10
          break;
        case "medium":
          scaleFactor = 0.25; // Increased from 0.20
          break;
        case "large":
          scaleFactor = 0.30; // Increased from 0.25
          break;
        default:
          scaleFactor = 0.10; // Increased from 0.07
      }

      // Define overlay position dynamically
      let overlayX, overlayY;
      switch (position) {
        case "top-left":
          overlayX = 10;
          overlayY = 10;
          break;
        case "top-right":
          overlayX = "main_w-overlay_w-20"; // Increased offset
          overlayY = 10;
          break;
        case "bottom-left":
          overlayX = 10;
          overlayY = "main_h-overlay_h-20"; // Increased offset
          break;
        case "bottom-right":
          overlayX = "main_w-overlay_w-20"; // Increased offset
          overlayY = "main_h-overlay_h-20"; // Increased offset
          break;
        case "center":
          overlayX = "(main_w-overlay_w)/2";
          overlayY = "(main_h-overlay_h)/2";
          break;
        default:
          overlayX = "main_w-overlay_w-20"; // Increased offset
          overlayY = 10;
      }


      ffmpeg()
        .input(webPath) // Main video
        .inputOptions("-stream_loop -1") // Loop main video infinitely
        .input(camPath) // Overlay video (Camera feed)
        .complexFilter([
          `[1:v]scale=iw*${scaleFactor}:ih*${scaleFactor}[overlay]; [0:v][overlay]overlay=${overlayX}:${overlayY}`
        ])
        .outputOptions("-shortest") // Trim output to match overlay video duration
        .output(outputPath)
        .on("end", resolve)
        .on("error", (err) => {
          console.error("❌ Error processing video:", err.message);
          reject(err);
        })
        .run();

    });
  } catch (err) {
    console.error("❌ Error getting video duration:", err.message);
    throw err;
  }
};

module.exports = mergeVideos;
