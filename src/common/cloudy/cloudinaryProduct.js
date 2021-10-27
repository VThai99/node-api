require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "cloudygod",
  api_key: "334367223732826",
  api_secret: "Bjfc6cm80qPbwqkjP2d2QOggwfc",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "product"},
});
const uploadCloud = multer({ storage });
module.exports = uploadCloud;
