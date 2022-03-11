let express = require("express");
let router = express.Router();
const path = require('path');
const food_data = require('../food_data.json');
const reviews = require("../reviews.json");

router.get('/all', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../food_data.json'));
});

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

module.exports = router;