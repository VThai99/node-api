const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/ProductController");
const uploadFiler = require("../common/cloudy/cloudinaryProduct")

router.get("/list", controller.getAllProduct);
router.post("/add", uploadFiler.single("image"), controller.createProduct);
router.get("/:id", controller.getProductId);
router.put("/update/:id", uploadFiler.single("image"), controller.updateProduct);
router.delete("/delete/:id",controller.deleteProduct)
module.exports = router;
