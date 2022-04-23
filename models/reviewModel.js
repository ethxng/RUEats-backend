let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    food_id: {type: Schema.Types.ObjectId, ref: "Food", required: true},
    review: {type: String, required: true},
    rating: {type: Number, required: true},
    OP: {type: Schema.Types.ObjectId, ref:"User", required: true}
});

module.exports = mongoose.model("Review", reviewSchema);