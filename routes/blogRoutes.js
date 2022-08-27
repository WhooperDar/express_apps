const express = require("express"); 
const router = express.Router(); 
const controller = require("../controller/blogController"); 

// blog routues
router.get('/' , controller.blog_index); 
router.post('/', controller.blog_create_post); 
router.delete('/:id', controller.blog_delete);
router.get('/data/:id', controller.blog_details);
router.get("/create", controller.blog_create_get); 


module.exports = router; 