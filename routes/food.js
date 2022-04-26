let express = require("express");
let router = express.Router();
const path = require('path');
const fs = require('fs');
const food_data = require('../food_data.json');
const reviews = require("../reviews.json");
const mongoose = require('mongoose');
const Food = require('../models/foodModel');
const Review = require('../models/reviewModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');

function getToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }  else{
        res.sendStatus(403);
    }
}

// return all food
router.get('/all', (req, res, next) => {
    Food.find({}).populate('restaurant_id').exec((err, results) => {
        if (err)
            return next(err);
        else {
            res.send(results);
        }
    });
});

// getting a specific food
router.get('/:id', (req, res, next) => {
    Food.findById(req.params.id).exec('restaurant_id').exec((err, result) => {
        if (err)
            return next(err);
        else{
            res.send(result);
        }
    })
});

// getting all reviews for a specific food
router.get("/:id/reviews", (req, res, next) => {
    Review.find({food_id: req.params.id}).populate('food_id').populate('OP').exec((err, results) => {
        if (err)
            return next(err);
        else{
            res.send(results);
        }
    });
});

// posting a new review
router.post('/:id/reviews', getToken, (req, res, next) => {
    jwt.verify(req.token, 'incubator', err => {
        if (err)
            res.sendStatus(401);
        else{
            let data = new Review({
                food_id: req.params.id, 
                review: req.body.review,
                rating: req.body.rating, 
                OP: req.user.id
            });
            data.save(err => {
                if (err)
                    return next(err);
                else{
                    res.status(200).send("submit new review successfully");
                }
            });
        }
    })
});

module.exports = router;