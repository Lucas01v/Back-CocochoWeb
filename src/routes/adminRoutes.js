const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const adminRouter = express.Router();
// const  require('../middleware/;


// Obtener todos los productos
adminRouter.get('/products', getAllProducts);

// Obtener un producto por ID
adminRouter.get('/products/:id', getProductById);

// Crear un nuevo producto
adminRouter.post('/products/create', createProduct);

// Actualizar un producto por ID
adminRouter.patch('/products/update/:id', updateProduct);

// Eliminar un producto por ID
adminRouter.delete('/products/delete/:id', deleteProduct);

module.exports = adminRouter;
