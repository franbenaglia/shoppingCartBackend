const ProductModel = require('../models/product');
const StockModel = require('../models/stock');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.create = async (req, res) => {

    if (!req.body.name && !req.body.price) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const stock = new StockModel({
        total: req.body.stock.free,
        free: req.body.stock.free,
        reserved: 0,
        buyed: 0,
    });

    let stockId;

    await stock.save().then(data => {
        stockId = data._id;
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating product-stock"
        });
    });

    const product = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        imageDataBase64: req.body.imageDataBase64,
        stock: stockId,
    });

    await product.save().then(data => {
        res.send({
            message: "Product created successfully!!",
            product: data
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating product"
        });
    });
};

exports.findAll = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).populate('stock');
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const generateImageFromBuffer = buffer => {
    let _buffer = new Buffer.from(buffer, 'base64');
    return _buffer.toString('base64');
};

exports.update = async (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await ProductModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`
            });
        } else {
            res.send({ message: "Product updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.destroy = async (req, res) => {

    await ProductModel.findOneAndDelete({ _id: req.params.id }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`
            });
        } else {
            res.send({
                message: "Product deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};