const express = require("express");
const router = express.Router();
const controller = require("../controllers/BrandController");
const fileUploader = require("../common/cloudy/cloudinaryBrand");
const authorize = require("../common/authorization/authorization-middleware");

router.get("", controller.getAllBrand);
router.get("/:id", controller.getProductInBrand);
router.post("",authorize("ADMIN") ,fileUploader.single("logo"), controller.createBrand);
router.put("/:id",authorize("ADMIN"),fileUploader.single("logo"),controller.updateBrand);
router.delete("/:id", authorize("ADMIN"),controller.deleteBrand);

module.exports = router;