const express = require("express");
const path = require('path');
const app = express();
const PORT = 2003;

const app = express();

app.get('/', (req, res, next) => {
    res.send('Welcome to RUEats');
  });

//app.get('/food', (req, res, next) => {
//    res.sendFile(path.join(__dirname, '/sample_data.json'));
//  });
  
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
