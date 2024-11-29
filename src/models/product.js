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
    imageDataBase64: {
        type: [String],
        required: false
    },
    description: {
        type: String,

    },
    stock: { type: mongoose.Schema.ObjectId, ref: "Stock" },
});



const Product = new mongoose.model('Product', schema);

module.exports = Product;

