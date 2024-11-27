const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    total: {
        type: Number,
        required: true,
    },

    free: {
        type: Number,
        required: true,
    },
    reserved: {
        type: Number,
        required: true,
    },
    buyed: {
        type: Number,
        required: true,
    }
});

schema.method('isValidUpdate', async function (total, free, reserved, buyed) {
    console.log('validatttttttttttteeeeeeeeeeeeeee');
    const isValid = total === free + reserved + buyed;
    return isValid;
});

schema.pre('validate', function (next) {
    if (this.total === this.free + this.reserved + this.buyed) {
        next();
    } else {
        return next(new Error('error in stock validation : ' + this.total + '!=' + this.free + this.reserved + this.buyed));
    }
});


const Stock = new mongoose.model('Stock', schema);

module.exports = Stock;