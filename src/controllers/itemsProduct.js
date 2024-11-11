const ItemsProductModel = require('../models/itemsProduct');

exports.create = async (req, res) => {

    if (!req.body.quantity && !req.body.product) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const product = {}; // get by id or ... create before and get the response

    const itemsProductModel = new ItemsProductModel({
        quantity: req.body.quantity,
        product: req.body.product,  // product
    });

    await itemsProductModel.save().then(data => {
        res.send({
            message: "Item-Product created successfully!!",
            product: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating product"
        });
    });
};

exports.findAll = async (req, res) => {
    try {
        const itemProducts = await ItemsProductModel.find();
        res.status(200).json(itemProducts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const itemproduct = await ItemsProductModel.findById(req.params.id);
        res.status(200).json(itemproduct);
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

    await ItemsProductModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Item Product not found.`
            });
        } else {
            res.send({ message: "Item Product updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.destroy = async (req, res) => {

    await ItemsProductModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Item Product not found.`
            });
        } else {
            res.send({
                message: "Item Product deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};