let express = require('express');
let router = express.Router();
const fs = require('fs');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


router.get('/', (req, res, next) => {
    if (err)
        res.send("Welcome to RUEats! (not logged in)");
    else    res.send("Welcome to RUEats!"); 
});

router.get('/log-in', (req, res, next) => {
    res.send("here is where you will log in");
});

router.get("/sign-up", (req, res, next) => {
    res.send("sign up here");
});

router.post('/sign-up', (req, res, next) => {
    let data = {
        first_name: req.body.first_name, 
        last_name: req.body.last_name, 
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    }
    let newUser = new User(data);
    newUser.save(err => {
        if (err)
            return next(err);
        else{
            res.status(200).send("Account created successfully!");
        }
    });
});

router.post('/log-in', (req, res, next) => {
    User.find({username: req.body.username, password: req.body.password}).exec((err, user) => {
        if (err)
            return next(err);
        else if (user !== null){
            const token = jwt.sign({user: user}, 'incubator', {expiresIn: "1h"});
            console.log("token: " + token);
            res.status(200).json({token, message: "Signed in successfully"});
        } else{
            res.send("Something went wrong while authenticating");
        }
    })
});

router.post('log-out', (req, res, next) => {
    req.token = null; 
});

module.exports = router;