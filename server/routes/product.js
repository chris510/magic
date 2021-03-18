const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/api/products', async (req, res) => {
    const products = await global.db.Product.findAll();
    return res.send(products);
})

router.get('/api/products/:id', async (req, res) => {
    try {
        const product = await global.db.Product.findOne({
            where: {
                id: req.params.id,
            },
            attributes: { exclude: ["createdAt", "updatedAt"]},
        })
        res.status(200).send(product);
    } catch (err) {
        res.status(404).send({ message: 'Product can not be found' });
    }
});

module.exports.productRouter = router;