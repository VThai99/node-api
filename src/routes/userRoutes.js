const express = require("express");
const router = express.Router();
const multer = require("multer");
const {validationResult} = require('express-validator');
const controller = require('../controllers/UserController');

router.get("/list", controller.getAllUser);
router.post("/add", controller.createAccount);
router.post("/login", controller.login);
module.exports = router;