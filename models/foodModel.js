let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let foodSchema = new Schema({
    restaurant_id: {type: Schema.Types.ObjectId, ref: "Restaurant", required: true},
    name: {type: String, required: true},
    description: {type: String, required: true}, 
});

module.exports = mongoose.model('Food', foodSchema);