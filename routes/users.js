const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require("bcryptjs");
const passport = require('passport'); // bitta hato 


/* GET home page. */
router.get('/register', function(req, res, next) {

    res.render('register', {title: "Ro'yhatdan o`tish sahifasi"})

});

router.post('/register', function(req, res, next) {

    console.log('ro`yhatdan o`tish');

    req.checkBody('name', 'iltimos ismingizni kiriting').notEmpty()
    req.checkBody('username', 'iltimos usernameingizni kiriting').notEmpty()
    req.checkBody('email', 'iltimos emailingizni qoldiring ').notEmpty()
    req.checkBody('password', 'iltimos parolingizni qoldiring ').notEmpty()
    req.checkBody('password2', 'iltimos parolingizni tasdiqlang ').equals(req.body.password)

    const errors = req.validationErrors();

    if(errors){
        res.render("register", { title: " Ro`yhatdan o`tish sahifasi",
        errors: errors
    })
    }
    else{

        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.password2;

        const newuser = new User({
            name: name,
            username: username,
            email: email,
            password: password,
        });

        bcrypt.genSalt(10, (err, pass) => {
            bcrypt.hash(newuser.password, pass,(err, hash) => {
                if(err) console.log(err);
                newuser.password = hash;
                newuser.save((err) => {
                    if(err) console.log(err);
                    else{
                        req.flash("danger" , "iltimos Tizimga kiring");

                        res.redirect("/login");

                    }
                })
            })
        })


    }

});


/* GET home page. */
router.get('/login', function(req, res, next) {

    res.render('login', {title: " Saytga kirish"})

});


router.post('/login', function(req, res, next) {

    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res , next);
    
});
router.get('/logout', function(req, res, next) {
    req.logout()
    req.flash('succes', 'tizimdan shiqdez')
    res.redirect('/login')
});

module.exports = router;
