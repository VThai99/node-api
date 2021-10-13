const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/CategoryController");

const storageImage = multer.diskStorage({
  destination: "./src/category/image/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadImage = multer({
  storage: storageImage,
});

const storageVideo = multer.diskStorage({
  destination: "./src/category/video/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadVideo = multer({
  storage: storageVideo
});

router.get("/list", controller.getAllCategory);
router.post("/add",uploadVideo.single("trailer"),controller.createCategory);

module.exports = router;