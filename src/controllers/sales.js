const SaleModel = require('../models/sale');

exports.create = async (req, res) => {

    const user = null; //get by login or ?  login: req.body.login,
    const ItemsProduct= null;

    const sale = new SaleModel({
        user: user,
        ItemsProduct: ItemsProduct, //could be an array
    });

    await sale.save().then(data => {
        res.send({
            message: "Sale created successfully!!",
            sale: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating sale"
        });
    });
};

exports.findAll = async (req, res) => {
    try {
        const sale = await SaleModel.find();
        res.status(200).json(sale);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const sale = await SaleModel.findById(req.params.id);
        res.status(200).json(sale);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.update = async (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await SaleModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Sale not found.`
            });
        } else {
            res.send({ message: "Sale updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.destroy = async (req, res) => {
    await SaleModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Sale not found.`
            });
        } else {
            res.send({
                message: "Sale deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};