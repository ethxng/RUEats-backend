let express = require("express");
let router = express.Router();
const path = require('path');
const fs = require('fs');
const restaurants_data = require("../sample_data.json");
const Restaurant = require('../models/restaurantModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Food = require("../models/foodModel");

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

// returning all restaurants
router.get('/all', getToken, (req, res, next) => {
    Restaurant.find({}).exec((err, results) => {
        if (err)
            return next(err);
        else{
            res.status(200).send(results);
        }
    });
});

// return a specific restaurant
router.get('/:id', (req, res, next) => {
    Restaurant.findById(req.params.id).exec((err, result) => {
        if (err)
            return next(err);
        else{
            res.status(200).send(result);
        }
    })
});

// posting a food from a specific restaurant
router.post('/:id', getToken, (req, res, next) => {
    jwt.verify(req.token, 'incubator', err => {
        if (err)
            res.sendStatus(401);
        else{
            let data = new Food({
                restaurants_id: req.params.id,
                name: req.body.name,
                description: req.body.description
            });
            data.save(err => {
                if (err)
                    res.status(500).send("unable to save data. try again later!");
                else  
                    res.status(200).send("submit new food successfully");
            })
        }
    })
})


// submitting new restaurant
router.post("/", (req, res, next) => {
    jwt.verify(req.token, 'incubator', err => {
        if (err)
            res.sendStatus(401);
        else{
            let data = new Restaurant({
                name: req.body.name,
                address: req.body.address, 
                coordinates: [0,0]
            });
            data.save(err => {
                if (err)
                    return next(err);
                else{
                    res.status(200).send("submit new restaurant succesfully");
                }
            });
        }
    });
});

module.exports = router;