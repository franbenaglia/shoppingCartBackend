const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    product: { type: mongoose.Schema.ObjectId, ref: "Product" },

    quantity: {
        type: Number,
        required: true,
    },
});


const ItemsProduct = new mongoose.model('ItemsProduct', schema);

module.exports = ItemsProduct;
