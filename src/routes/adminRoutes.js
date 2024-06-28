const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { uploadImage, getImages } = require('../controllers/imageController');
const upload = require('../middlewares/multer');
const adminRouter = express.Router();
// const  require('../middleware/;


//PRODUCTOS
adminRouter.get('/products', getAllProducts); // Obtener todos los productos
adminRouter.get('/products/:id', getProductById); // Obtener un producto por ID
adminRouter.post('/products/create', createProduct); // Crear un nuevo producto
adminRouter.patch('/products/update/:id', updateProduct); // Actualizar un producto por ID
adminRouter.delete('/products/delete/:id', deleteProduct); // Eliminar un producto por ID

//IMÁGENES
adminRouter.get('/images', getImages); //Listar imágenes
adminRouter.post('/images/upload', upload.single('image'), uploadImage); //Cargar imágen

module.exports = adminRouter;
