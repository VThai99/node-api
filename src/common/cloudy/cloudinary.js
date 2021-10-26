require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  destination: 'category',
  allowedFormats: ["jpg", "png", "gif"],
  filename: (req, res, cb) => {
    cb(null, file.originalname);
  },
});
const uploadCloud = multer({ storage });
module.exports = uploadCloud;
