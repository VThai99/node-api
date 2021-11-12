const express = require("express");
const router = express.Router();
const controller = require("../controllers/CategoryController");
const fileUploader = require("../common/cloudy/cloudinary");
const authorize = require("../common/authorization/authorization-middleware");

router.get("", controller.getAllCategory);
router.get("/:id", controller.getProductInCate);
router.post("",authorize("ADMIN") ,fileUploader.single("image"), controller.createCategory);
router.put("/:id",authorize("ADMIN"),fileUploader.single("image"),controller.updateCategory);
router.delete("/:id", authorize("ADMIN"),controller.deleteCategory);

module.exports = router;
