var mongoose = require('mongoose');

var users = new mongoose.Schema({
    username: {
        type: String,
        index: {
            unique: true
        }
    },
    password: String,
    email: String
});

var addresses = new mongoose.Schema({
    owner: String,
    name: String,
    address: String,
    email: String,
    phone: String,
    birthday: Date,
    otherInfo: String
});

var User = mongoose.model('User', users);
var Address = mongoose.model('Address', addresses);

exports.connect = function(uri)  {
    mongoose.connect(uri, function(err, succ) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log('Connected to ' + uri);
        }
    });
};

exports.registerUser = function(req, res) {

    if (!req.body.username || !req.body.password || !req.body.email) {
        res.render('register', {
            username: req.body.username ? req.body.username : '',
            email: req.body.email ? req.body.email : '',
            error: 'All fields are mandatory.'
        });
    } else {
        var temp = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        temp.save(function(err, data) {
            if (err) {
                if (11000 === err.code) {
                    res.render('register', {
                        username: temp.username,
                        email: temp.email,
                        error: 'User ' + temp.username + ' is already reserved.'
                    });
                } else {
                    res.render('register', {
                        username: temp.username,
                        email: temp.email,
                        error: 'Unknown fatal error. Please try again later.'
                    });
                }
            } else {
                req.session.username = temp.username;
                exports.getContacts(req, res);
            }
        });
    }
}

exports.loginUser = function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.render('login', { error: 'Invalid login.'});
    } else {

        User.find({username: req.body.username, password: req.body.password}, function(err, data) {
            if (err || !data.length) {
                res.render('login', { error: 'Invalid username or password.'});
            } else {
                req.session.username = data[0].username;
                exports.getContacts(req, res);
            }
        });
    }
};

exports.getContacts = function(req, res) {
    Address.find({ owner: req.session.username}, function(err, data) {
        if (err) {
            res.render('contacts', {
                username: req.session.username,
                contacts: [],
                error: 'Database failure.'
            });
        } else {
            res.render('contacts', {
                username: req.session.username,
                contacts: data
            });
        }
    });
};

exports.addContact = function(req,res){
    if (!req.body.name) {
        res.render('contact', {
            action: '/add_contact',
            id: '',
            name: '',
            address:  req.body.address ? req.body.address : '' ,
            email: req.body.email ? req.body.email : '',
            phone: req.body.phone ? req.body.phone : '',
            birthday: req.body.birthday ? req.body.birthday : '',
            otherInfo: req.body.otherInfo ? req.body.otherInfo : '',
            error: 'Name is mandatory.'
        });
    } else {
        var temp = new Address({
            owner:req.session.username,
            name:req.body.name,
            address:req.body.address,
            email:req.body.email,
            phone:req.body.phone,
            birthday:new Date(req.body.birthday),
            otherInfo:req.body.otherInfo
        });

        temp.save(function(err){
            if(err){
                res.render('contact',{
                    action: '/add_contact',
                    id: '',
                    name: req.body.name,
                    address:  req.body.address ? req.body.address : '' ,
                    email: req.body.email ? req.body.email : '',
                    phone: req.body.phone ? req.body.phone : '',
                    birthday: req.body.birthday ? new Date(req.body.birthday) : '',
                    otherInfo: req.body.otherInfo ? req.body.otherInfo : '',
                    error: 'Could not save contact in database.'
                });
            }else {
                exports.getContacts(req, res);
            }
        });
    }
};

exports.delContact = function(req, res) {
    Address.findById(req.body.id, function(err, data) {
        if (err || data.owner !== req.session.username) {
            res.render('error', { error: 'Cannot delete user.'});
        } else {
            data.remove(function(err) {
                if (err) {
                    res.render('error', { error: 'DB update fails.'});
                } else {
                    exports.getContacts(req, res);
                }
            });
        }
    });
};

exports.updContact = function(req, res) {
    Address.findById(req.body.id, function(err, data) {
        if (err || data.owner !== req.session.username) {
            res.render('error', { error: 'Cannot update user.'});
        } else {
            data.name = req.body.name;
            data.address = req.body.address ? req.body.address : '';
            data.email = req.body.email ? req.body.email : '';
            data.phone = req.body.phone ? req.body.phone : '';
            data.birthday = req.body.birthday ? new Date(req.body.birthday) : '';
            data.otherInfo = req.body.otherInfo ? req.body.otherInfo : '';
            data.save(function(err) {
                if (err) {
                    res.render('error', { error: 'DB update fails.'});
                } else {
                    res.render('contact',{
                        action: 'update',
                        id: req.query.id,
                        name: data.name,
                        address:  data.address,
                        email: data.email,
                        phone: data.phone,
                        birthday: data.birthday ? data.birthday : '',
                        otherInfo: data.otherInfo,
                        msg: 'Saved.'
                    });

                }
            });
        }
    });
};

exports.getContact = function(req, res) {
    Address.findById(req.query.id, function(err,data) {
        if(err || data.owner !== req.session.username) {
            res.render('error', { error: 'Cannot find user.'});
        } else {
            res.render('contact',{
                action: 'update',
                id: req.query.id,
                name: data.name,
                address:  data.address,
                email: data.email,
                phone: data.phone,
                birthday: data.birthday ? data.birthday : '',
                otherInfo: data.otherInfo
            });
        }
    });
};
