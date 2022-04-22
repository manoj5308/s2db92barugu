var express = require('express');
var router = express.Router();
var house_controller = require('../controllers/house');

/* GET home page. */
router.get('/', house_controller.house_view_all_Page);

module.exports = router;
