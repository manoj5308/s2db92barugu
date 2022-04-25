var express = require('express');
var router = express.Router();
var house_controller = require('../controllers/house');

// A little function to check if we have an authorized user and continue on or 
// redirect to login. 
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 

/* GET home page. */
router.get('/', house_controller.house_view_all_Page);

/* GET update house page */ 
router.get('/update', secured, house_controller.house_update_Page); 



module.exports = router;
