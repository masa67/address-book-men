var express = require('express');
var db = require('../modules/database');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('layout', {});
});

router.get('/contact_new', function(req, res) {
    res.render('contact', {
        action: 'add',
        name: '',
        address: '' ,
        email: '',
        phone: '',
        birthday: '',
        otherInfo: '',
    });
});

router.get('/contact', function(req, res) {
    db.getContact(req, res);
});

router.post('/contact', function(req, res) {
    db.addContact(req, res);
});

router.put('/contact', function(req, res) {
    db.updContact(req, res);
});

router.delete('/contact', function(req, res) {
    db.delContact(req, res);
});

router.get('/contacts', function(req, res) {
    if (req.session.username) {
        db.getContacts(req, res);
    } else {
        res.render('login', {});
    }
});

router.get('/login', function(req, res) {
    if (!req.session.username)
        res.render('login', {});
    else
        db.getContacts(req, res);
});

router.post('/login', function(req, res) {
    db.loginUser(req, res);
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.render('login', { msg: 'Thank You for using Contacts!'});
})

router.get('/owner_new', function(req, res) {
    res.render('register', { username: '', email: ''});
});

router.post('/owner', function(req, res) {
    db.registerUser(req, res);
});

module.exports = router;
