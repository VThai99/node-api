const express = require('express')
const router = express.Router();
const authorize = require('../common/authorization/authorization-middleware')
const controller = require('../controllers/ImportController')

router.get("",authorize("ADMIN"),controller.getAllImport)
router.post("",authorize("ADMIN"),controller.createImport)
module.exports = router