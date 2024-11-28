const SaleModel = require('../models/sale');
const UserModel = require('../models/user');
const ItemsProductModel = require('../models/itemsProduct');
const conn = require("../mongoose/config");

exports.createtx = async (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }

    const itemProducts = req.body.itemsProduct;

    const ips = [];

    try {

        const user = await UserModel.find({ email: req.body.user.email });

        const session = await conn.startSession();

        await session.withTransaction(async () => {


            for (let i = 0; i < itemProducts.length; i++) {

                const data = await ItemsProductModel.create([
                    {
                        quantity: itemProducts[i].quantity,
                        product: itemProducts[i].product._id,
                    }
                ], { session });

                ips.push(data._id);

            }

            await SaleModel.create([
                {
                    user: user[0]._id,
                    itemsProduct: ips,
                }
            ], { session });


        });

        session.endSession();

        res.send({
            message: "Sale created successfully!!",
            sale: data
        });

    } catch (error) {
        console.log('error:' + error);
        res.status(500).send({
            message: error.message || "Some error occurred while creating sale"
        });

    }
};

exports.create = async (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Data can not be empty!"
        });
    }

    const itemProducts = req.body.itemsProduct;

    const ips = [];

    try {

        const user = await UserModel.find({ email: req.body.user.email });

        for (let i = 0; i < itemProducts.length; i++) {

            const itemsProductModel = new ItemsProductModel({
                quantity: itemProducts[i].quantity,
                product: itemProducts[i].product._id,
            });

            await itemsProductModel.save().then(data => {
                ips.push(data._id);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating item-product"
                });
            });

        }

        const sale = new SaleModel({
            user: user[0]._id,
            itemsProduct: ips,
        });

        await sale.save().then(data => {
            res.send({
                message: "Sale created successfully!!",
                sale: data
            });
        }).catch(err => {
            console.log('err:' + err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating sale"
            });
        });

    } catch (error) {
        console.log('error:' + error);
        res.status(500).send({
            message: error.message || "Some error occurred while creating sale"
        });

    }
};

exports.findAll = async (req, res) => {
    try {
        const sale = await SaleModel.find().populate({
            path: 'itemsProduct',
            populate: { path: 'product' }
        });
        res.status(200).json(sale);
    } catch (error) {
        console.log('error:' + error);
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

exports.findOneByUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const sale = await SaleModel.find({ user: user._id }).populate({
            path: 'itemsProduct',
            populate: { path: 'product' }
        });
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

exports.updatePayment = async (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    try {

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

    } catch (error) {
        console.log('error:' + error);
        res.status(500).send({
            message: error.message || "Some error occurred while updating sale confirm"
        });

    }
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