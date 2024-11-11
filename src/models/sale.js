const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    user: { type: mongoose.Schema.ObjectId, ref: "User" },
//TODO ItemsProduct es una coleccion
    ItemsProduct: { type: mongoose.Schema.ObjectId, ref: "ItemsProduct" },
});


const Sale = new mongoose.model('Sale', schema);

module.exports = Sale;
