const express = require('express');

const ItemProductController = require('../controllers/itemsProduct');

const router = express.Router();

router.get('/', ItemProductController.findAll);

router.get('/:id', ItemProductController.findOne);

router.post('/', ItemProductController.create);

router.patch('/:id', ItemProductController.update);

router.delete('/:id', ItemProductController.destroy);

module.exports = router;