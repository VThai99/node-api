const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/CategoryController");


const storage = multer.diskStorage({
  destination: "./src/category/image/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

// const storageVideo = multer.diskStorage({
//   destination: "./src/category/video/",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const uploadVideo = multer({
//   storage: storageVideo
// });

router.get("/list", controller.getAllCategory);
router.post("/add",controller.createCategory);

module.exports = router;