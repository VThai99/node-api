const express = require("express");
const router = express.Router();
const multer = require("multer");
const { validationResult } = require("express-validator");
const controller = require("../controllers/UserController");
const authorize = require("../common/authorization/authorization-middleware");

router.get("", authorize("ADMIN"), controller.getAllUser);
router.post("/signup", controller.createAccount);
router.post("/login", controller.login);
router.post("/vertify-email",controller.vertifyEmail)
module.exports = router;
