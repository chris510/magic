const express = require('express');
const router = express.Router();
const db = require('../config/database');

const isValidPayment = (ccNum, exp) => {
    // TODO: Handle payment validation
    return true;
}


// FOR TESTING PURPOSES
router.get('/api/users', async (req, res) => {
    const users = await global.db.User.findAll({
        include: [ { model: global.db.Order }]
    });
    return res.send(users);
})

router.get('/api/orders', async (req, res) => {
    const orders = await global.db.Order.findAll({
        include: [ { model: global.db.User }]
    });
    return res.send(orders);
})


// TODO: Move Utility functions to separate file
const findUser = (email, productId) => {
    return global.db.User.findOne({
        where: {
            email
        },
        attributes: { exclude: ["createdAt", "updatedAt"]},
        include: [
            {
                model: global.db.Order,
                where: { productId },
                attributes: { exclude: ["createdAt", "updatedAt"]},
                required: false,
            }
        ],
    });
}

const canPurchaseProduct = (orders, product, quantity) => {
    if (!orders.length) return true;
    const maxPurchase = product.maxPurchase;

    let totalPurchase = quantity;
    for (const order of orders) {
        if (order.productId === product.id) {
            totalPurchase += order.quantity;
        }
        if (totalPurchase > maxPurchase) return false;
    }
    return true;
};

const createUser = (userInfo) => global.db.User.create(userInfo)
const createOrder = (orderInfo) => global.db.Order.create(orderInfo);
const getProduct = (productId) => global.db.Product.findOne({ where: { id: productId } });
const getOrder = (orderId) => {
    return global.db.Order.findOne({
        where: {
            id: orderId,
        },
        include: [
            {
                model: global.db.User,
                attributes: { exclude: ["createdAt", "updatedAt"]},
            },
        ]
    })
}

// TODO: Create billing validator through stripe/square
router.post('/api/magic', [], async (req, res) => {
    const { email, address, payment, productId, quantity } = req.body;
    const { ccNum, exp } = payment;
    if (!isValidPayment(ccNum, exp)) res.send(400).send({ message: 'Something is wrong with the provided payment information.'});
    try {
        let user = await findUser(email, productId);
        if (!user) {
            user = await createUser({
                ...req.body,
                ...address,
                ...payment,
            })
        }
        const orders = user?.Orders ?? [];

        const product = await getProduct(productId);
        const isPurchasable = canPurchaseProduct(orders, product, quantity);
        if (isPurchasable) {
            const order = await createOrder({userId: user.id, productId: product.id, quantity});
            return res.status(201).send({
                // message: 'Order has been created successfully',
                id: order.id,
                message: 'Order success!',
            })
        } else {
            console.log('hello');
            return res.status(400).send({ message: `Sorry, you have submitted orders for more than the max of ${product.maxPurchase}`})
        }
    } catch (err) {
        // TODO: Handle error
        res.status(404).send({ message: 'An error has occured!', err})
    }
})

router.get('/api/magic/:id', async(req, res) => {
    try {
        const orderInfo = await getOrder(req.params.id);
        const { quantity, total, orderDate, fulfilled, ccNum, exp, User } = orderInfo;
        const { firstName, lastName, email, street1, street2, city, state, zip, phone } = User;

        const order = {
            firstName,
            lastName,
            email,
            address: {
                street1, street2, city, state, zip
            },
            phone,
            payment: {
                ccNum, exp
            },
            quantity,
            total,
            orderDate,
            fulfilled,
        };
        return res.status(201).send(order);
    } catch (err) {
        return res.status(404).send({ message: 'Resource not found' });
    }
})

router.patch('/api/magic/', async (req, res) => {
    try {
        const { id, fulfilled } = req.body;
        const order = await getOrder(id);
        order.fulfilled = fulfilled;
        await order.save();
        return res.status(200).send({ message: 'Resource updated successfully'});
    } catch (err) {
        return res.status(404).send({ message: 'Resource not found'})
    }
})

router.delete('/api/magic/', async (req, res) => {
    try {
        const { id, fulfilled } = req.body;
        const order = await getOrder(id);
        order.fulfilled = fulfilled;
        await order.destroy();
        return res.status(200).send({ message: 'Resource deleted successfully'});
    } catch (err) {
        return res.status(404).send({ message: 'Resource not found'})
    }
})

module.exports.orderRouter = router;