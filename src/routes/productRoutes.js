const express = require("express");
const router = express.Router();
const controller = require("../controllers/ProductController");
const uploadFiler = require("../common/cloudy/cloudinaryProduct");
const authorize = require("../common/authorization/authorization-middleware");

router.get("",controller.getAllProduct);
router.get("/client", controller.getAllProductClient)
router.post("",authorize("ADMIN"),uploadFiler.array("image",5), controller.createProduct);
router.get("/:id", controller.getProductId);
router.put("/:id",authorize("ADMIN"),uploadFiler.array("image",5), controller.updateProduct);
router.delete("/:id",authorize("ADMIN"),controller.deleteProduct);
module.exports = router;
