const express = require("express"); 
const router = express.Router(); 
const loginController = require("../controller/loginController"); 

// login routes
router.get('/login', loginController.login_save); 

router.get('/login-user', loginController.login_user); 

router.get('/login-single', loginController.login_single);

module.exports = router;