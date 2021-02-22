const categoryRouter = require('./category.js');
const cartRouter = require('./cart.js');
const productRouter = require('./product.js');
const userRouter = require('./user.js');
const addressRouter = require('./address.js');
const orderRouter = require('./order.js');

module.exports = [
    categoryRouter,
    cartRouter,
    productRouter,
    userRouter,
    addressRouter,
    orderRouter
];