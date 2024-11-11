const express = require('express');
const passport = require('../security/passport');

const ProductController = require('../controllers/product');

const router = express.Router();

router.get('/', ProductController.findAll);

router.get('/:id', ProductController.findOne);

router.post('/', ProductController.create); //,  passport.authenticate("jwt", { session: false })

router.patch('/:id', ProductController.update);

router.delete('/:id', ProductController.destroy);

module.exports = router;