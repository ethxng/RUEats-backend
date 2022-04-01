const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();
const PORT = 2003;

var restaurantsRouter = require('./routes/restaurant');
var indexRouter = require('./routes/indx');
var foodsRouter = require('./routes/food');
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.use('/restaurants', restaurantsRouter);
app.use('/foods', foodsRouter);

app.listen(PORT, () => {
    console.log(`Listening on port No. ${PORT}`)
});

module.exports = app;
