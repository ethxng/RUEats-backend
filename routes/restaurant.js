let express = require("express");
let router = express.Router();
const path = require('path');

router.get('/all', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../sample_data.json'));
});

module.exports = router;