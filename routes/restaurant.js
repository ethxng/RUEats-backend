let express = require("express");
let router = express.Router();
const path = require('path');
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
})

module.exports = router;