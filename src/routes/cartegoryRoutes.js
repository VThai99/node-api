const express = require("express");
const router = express.Router();
const controller = require("../controllers/CategoryController");
const fileUploader = require('../common/cloudy/cloudinary')

router.get("/list", controller.getAllCategory);
// router.post("/add",controller.createCategory);
// router.get("/list-image", controller.getAllImage);
router.post("/add",fileUploader.single('image'),controller.createCategory);
module.exports = router;