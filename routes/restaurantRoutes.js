const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantControllers.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get("/dinner", controller.Dinnerlanding);
router.get("/peter", controller.lunchlanding);
router.get("/home", verify, controller.homepage);
router.get("/aboutus", verify, controller.aboutus);
router.get('/new',verify, controller.showAddDishToDB);
router.post('/new', verify, controller.addDishToDB);
router.get('/editThis',verify,controller.show_edit_entries);
router.post('/editThis',verify, controller.edit_an_entry);
router.get('/availableS',verify,controller.availability_of_entries);
router.post('/availableS',verify,controller.hide_an_entry);
router.get('/posts/:Menutype', controller.show_user_entries);
router.get("/loggedIn",verify, controller.stafflanding);
router.get("/logout", controller.logout);



router.use(function(req, res) {
        res.status(404);
        res.type('text/plain');
        res.send('404 Not found.');
    });
router.use(function(err, req, res, next) {
        res.status(500);
        res.type('text/plain');
        res.send('Internal Server Error.');
    });
module.exports = router;