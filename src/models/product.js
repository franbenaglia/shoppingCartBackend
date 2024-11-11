const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,

    },
});



const Product = new mongoose.model('Product', schema);

module.exports = Product;

