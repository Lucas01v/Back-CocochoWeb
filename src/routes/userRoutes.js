const express = require('express');
// const authMiddleware = require('../middlewares/authMiddleware');
const { getAllProducts, getProductById } = require('../controllers/productController');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

const userRouter = express.Router();

//PRODUCTOS
userRouter.get('/products', getAllProducts); // Obtener todos los productos
userRouter.get('/products/:id', getProductById); // Obtener un producto por ID

//CARRITO
userRouter.get('/cart', getCart);
userRouter.post('/cart/addCart', addToCart);
userRouter.delete('/cart/delete', removeFromCart);

module.exports = userRouter;