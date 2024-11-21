const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    user: { type: mongoose.Schema.ObjectId, ref: "User" },

    itemsProduct: [{ type: mongoose.Schema.ObjectId, ref: "ItemsProduct" }],

    transactionId: String,
});


const Sale = new mongoose.model('Sale', schema);

module.exports = Sale;
