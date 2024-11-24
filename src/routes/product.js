const express = require('express');
const passport = require('../security/passport');

const jwt = require('jsonwebtoken');

const ProductController = require('../controllers/product');

const Authorization = require('../security/authorization');

const router = express.Router();

router.get('/', ProductController.findAll);

router.get('/:id', ProductController.findOne);

router.post('/', passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    Authorization.authorization(req, res, ProductController.create, 'admin')
});

router.patch('/:id', passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    Authorization.authorization(req, res, ProductController.update, 'admin')
});

router.delete('/:id', passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    Authorization.authorization(req, res, ProductController.destroy, 'admin')
});

module.exports = router;
