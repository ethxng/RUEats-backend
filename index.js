const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();
const PORT = 2003;
const mongoose = require('mongoose');

const mongoDB = "mongodb+srv://admin1:ethan@cluster0.6akjg.mongodb.net/RUEats?retryWrites=true&w=majority";
mongoose.connect(mongoDB,{ useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "mongo connection error"));

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
