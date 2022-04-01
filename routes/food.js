let express = require("express");
let router = express.Router();
const path = require('path');
const fs = require('fs');
const food_data = require('../food_data.json');
const reviews = require("../reviews.json");

router.get('/all', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../food_data.json'));
});

// getting a specific food
router.get('/:id', (req, res, next) => {
    // id is unique for each food
    let found = false;
    for (let i = 0; i < food_data.length; i++){
        if (food_data[i].id == req.params.id){
            found = true;
            res.send(JSON.stringify(food_data[i]));
        }
    }
    if (found == false)
        res.send("Food not found!");
});

// getting all reviews for a specific food
router.get("/:id/reviews", (req, res, next) => {
    let result = [];
    for (let i = 0; i < reviews.length; i++){
        if (reviews[i].food_id == req.params.id){
            result.push(reviews[i]);
        }
    }
    if (result.length == 0){
        res.send("Either this food does not exist or there are no reviews yet.");
    } else{
        res.send(JSON.stringify(result));
    }
})

// posting a new review
router.post('/:id/reviews', (req, res, next) => {
    let orignalData = fs.readFileSync('./reviews.json');
    let data = JSON.parse(orignalData);
    // generate an id from 0 to 1000, inclusive
    let id = Math.floor(Math.random() * 1000) + 1;
    
    // check to see if the newly generated id has been used before
    while ((data.some(rev => rev.id === id)) !== null){
        id = Math.floor(Math.random() * 1000) + 1;
    }
    let newReview = {
        "id": id,
        "food_id": req.params.id,
        "ratings": req.body.ratings,
        "description": req.body.description
    };
    data.push(newReview);
    let modifiedData = JSON.stringify(data);
    fs.writeFileSync('./reviews.json', modifiedData);
    res.status(200).send("submit review successfully");
});

module.exports = router;