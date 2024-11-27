const StockModel = require('../models/stock');
const ProductModel = require('../models/product');


exports.reserved = async (req, res) => {

    const idProduct = req.params.id;

    const product = await ProductModel.findById(idProduct).populate('stock');

    if (product.stock.free > 0) {
        req.body.free = product.stock.free - 1;
        req.body.reserved = product.stock.reserved + 1;
    } else {
        throw new Error('without stock!!!');
    }

    //StockModel.isValidUpdate();

    await StockModel.findByIdAndUpdate(product.stock._id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Stock not found.`
            });
        } else {
            res.send({ message: "Stock updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.cancelled = async (req, res) => {

    const idProduct = req.params.id;

    const product = await ProductModel.findById(idProduct).populate('stock');

    req.body.free = product.stock.free + 1;
    req.body.reserved = product.stock.reserved - 1;

    await StockModel.findByIdAndUpdate(product.stock._id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Stock not found.`
            });
        } else {
            res.send({ message: "Stock updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.buyed = async (req, res) => {

    const l = req.body.length;

    const success = true;

    for (let i = 0; i < l; i++) {

        let product = await ProductModel.findById(req.body[i].productid).populate('stock');
        let reserved = product.stock.reserved - req.body[i].quantity;
        let buyed = product.stock.buyed + req.body[i].quantity;

        let body = {
            reserved: reserved,
            buyed: buyed
        };

        await StockModel.findByIdAndUpdate(product.stock._id, body, { useFindAndModify: false }).then(data => {
            if (!data) {
                console.log('Error updating stock ' + data);
                success = false;
            } else {
                console.log('Updating stock ' + product.stock._id + ': ' + data);
            }
        }).catch(err => {
            console.log('Error updating stock ' + err);
            success = false;
        });

    }

    if (success) {
        res.status(200).send({ message: "Stock updated successfully." })
    } else {
        res.status(500).send({ message: "Error updating stock." })
    }

};



