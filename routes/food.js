let express = require("express");
let router = express.Router();
const path = require('path');

router.get('/all', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../food_data.json'));
});

module.exports = router;