const express = require('express')
const router = express.Router();
const authorize = require('../common/authorization/authorization-middleware')
const controller = require('../controllers/RatingController')

router.get("",controller.getAllRating)
module.exports = router