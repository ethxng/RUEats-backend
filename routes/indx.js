let express = require('express');
let router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
    if (res.locals.currentUser === null)
        res.send("Welcome to RUEats! (not logged in)");
    else{
        //res.send(`Welcome to RUEats, ${res.locals.currentUser.username}!`);
        console.log(res.locals.currentUser);
        res.send(res.locals.currentUser);
    }
});

router.get('/log-in', (req, res, next) => {
    res.send("here is where you will log in");
});

router.post('/log-in', (req, res, next) => {
    let orignalData = fs.readFileSync('./users_data.json');
    let data = JSON.parse(orignalData);
    let user = {
        username: req.body.username,
        password: req.body.password
    };
    let found = false;
    for (let i = 0; i < data.length; i++){
        if (data[i].username === req.body.username && data[i].password === req.body.password){
            res.locals.currentUser = user;
            found = true;
            // just send a message back with user's id
            res.redirect('/');
        }
    }
    // if got out of loop, then user does not exist
    if (found === false)
        res.send("credentials are not correct! try again!");
});

module.exports = router;