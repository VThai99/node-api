const express = require("express");
const router = express.Router();
const controller = require("../controllers/OrderController");
router.get("", controller.getAllOrder);
router.get("/:id", controller.getOrderDetail);
router.post("", controller.createOrder);
router.delete("/:id", controller.deleteOrder);
module.exports = router;
