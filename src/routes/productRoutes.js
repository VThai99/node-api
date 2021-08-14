const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/ProductController");

const storage = multer.diskStorage({
  destination: "./src/image/",
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

router.get("/list", controller.getAllProduct);
router.post("/add", upload.single("image"), controller.createProduct);
router.get("/:id", controller.getProductId);
router.put("/:id", upload.single("image"), controller.updateProduct);
router.delete("/:id",controller.deleteProduct)
module.exports = router;
