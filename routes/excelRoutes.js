const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadExcel,
  uploadCamVideo,
  startProcessing,
  terminateProcessing,
  getAllVideos,
} = require("../controllers/excelController");
const crypto = require("crypto");

const { verifyToken } = require("../middleware/verifyToken"); // ✅ Ensure Authentication

const router = express.Router();

// 🟢 Custom Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {

    const ext = path.extname(file.originalname).toLowerCase();
    
    // Generate a cryptographically unique filename (prevents collisions)
    const uniqueId = crypto.randomBytes(8).toString("hex"); // 16-character unique ID
    const timestamp = Date.now(); // Adds timestamp to ensure uniqueness
    cb(null, `${file.fieldname}-${uniqueId}-${timestamp}${ext}`); 
  },
});

// 🟢 File Filters
const excelFilter = (req, file, cb) => {
  if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    cb(null, true);
  } else {
    cb(new Error("❌ Invalid file type. Only .xlsx files are allowed."), false);
  }
};

const videoFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(new Error("❌ Invalid file type. Only .mp4 videos are allowed."), false);
  }
};

// 🟢 Upload Middleware Instances
const uploadExcelFile = multer({ storage, fileFilter: excelFilter });
const uploadVideoFile = multer({ storage, fileFilter: videoFilter });

// ✅ Upload Excel File (Only `.xlsx` Allowed) - Requires Authentication
router.post(
  "/upload-excel",
  verifyToken, // ✅ Ensure User is Authenticated First
  uploadExcelFile.single("file"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "Invalid file type. Only .xlsx files are allowed." });
    }
    next();
  },
  uploadExcel
);

// ✅ Upload Camera Video (Only `.mp4` Allowed) - Requires Authentication
router.post(
  "/upload-cam-video",
  verifyToken, // ✅ Ensure User is Authenticated First
  uploadVideoFile.single("file"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "Invalid file type. Only .mp4 videos are allowed." });
    }
    next();
  },
  uploadCamVideo
);

router.post("/terminate", verifyToken, terminateProcessing);

// ✅ Start Processing (After Both Files Are Uploaded)
router.post(
  "/start-processing",
  verifyToken,
  (req, res, next) => {
    req.body.manualStart = true; // ✅ Enforce manual trigger
    next();
  },
  startProcessing
);

router.get("/all-videos", verifyToken, getAllVideos);

module.exports = router;
