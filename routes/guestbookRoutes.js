const express = require('express');
const router = express.Router();
const controller = require('../controllers/guestbookControllers.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get("/ann", controller.annlanding_page);
router.get("/peter", controller.peterlanding_page);
router.get('/new',verify, controller.show_new_entries);
router.post('/new', verify, controller.post_new_entry);
router.get('/editThis',verify,controller.show_edit_entries);
router.post('/editThis',verify, controller.edit_an_entry);
router.get('/availableS',verify,controller.availability_of_entries);
router.post('/availableS',verify, controller.hide_an_entry);
router.get('/posts/:author', controller.show_user_entries);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get("/loggedIn",verify, controller.loggedIn_landing);
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