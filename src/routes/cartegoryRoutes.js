const express = require("express");
const router = express.Router();
const controller = require("../controllers/CategoryController");
const fileUploader = require("../common/cloudy/cloudinary");

router.get("/list", controller.getAllCategory);
router.get("/:id", controller.getProductInCate);
router.post("/add", fileUploader.single("image"), controller.createCategory);
router.put("/update/:id",fileUploader.single("image"),controller.updateCategory);
router.delete("/delete/:id", controller.deleteCategory);

module.exports = router;
