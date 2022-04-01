let express = require("express");
let router = express.Router();
const path = require('path');
const fs = require('fs');
const restaurants_data = require("../sample_data.json")

router.get('/all', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../sample_data.json'));
});

router.get('/:id', (req, res, next) => {
    let found = false
    for(let i=0; i< restaurants_data.length; i++){
        if (restaurants_data[i].id == req.params.id){
            found = true;
            res.send(JSON.stringify(restaurants_data[i]));
        }
    }
    if(found == false){
        res.send("Restaurant not found")
    }
});

// submitting new restaurant
router.post("/", (req, res, next) => {
    let name = req.body.name, address = req.body.address, coordinates = [1,1], ratings = 0.0;
    let orignalData = fs.readFileSync('./sample_data.json');
    let data = JSON.parse(orignalData);
    let newRestaurant = {
        "name": name,
        "address": address,
        "coordinates": coordinates, 
        "ratings": ratings,
        "id": 200
    }
    data.push(newRestaurant);
    let modifiedData = JSON.stringify(data);
    fs.writeFileSync('./sample_data.json', modifiedData);
    res.status(200).send("submit restaurant successfully");
});

module.exports = router;