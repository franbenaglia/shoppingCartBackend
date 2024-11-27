const express = require('express');

const StockController = require('../controllers/stock');

const router = express.Router();

router.put('/reserved/:id', StockController.reserved);

router.put('/buyed/', StockController.buyed);

router.put('/cancelled/:id', StockController.cancelled);

module.exports = router;