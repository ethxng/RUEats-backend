let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let restaurantSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    coordinates: [{type: Number}],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);