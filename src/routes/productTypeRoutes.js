const express = require('express')
const router = express.Router();
const uploadFiler = require("../common/cloudy/cloudinaryProductType");
const authorize = require('../common/authorization/authorization-middleware')
const controller = require('../controllers/ProductTypeController')


router.get("/:pId",controller.getAllProductType)
router.post("/:pId",uploadFiler.single("image"),controller.createProductType)
router.put("/:pId/:id",uploadFiler.single("image"),controller.updateProductType)
module.exports = router