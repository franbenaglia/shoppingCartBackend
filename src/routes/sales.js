const express = require('express');

const SalesController = require('../controllers/sales');

const router = express.Router();

router.get('/', SalesController.findAll);

router.get('/:id', SalesController.findOne);

router.post('/', SalesController.create);

router.patch('/:id', SalesController.update);

router.put('/confirmpayment/:id', SalesController.updatePayment);

router.delete('/:id', SalesController.destroy);

module.exports = router;