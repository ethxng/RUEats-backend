let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Welcome to RUEats!");
});

module.exports = router;