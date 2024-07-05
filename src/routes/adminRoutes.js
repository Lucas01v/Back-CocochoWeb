const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { uploadImage, getImages } = require('../controllers/imageController');
const { login } = require('../controllers/authController');
const upload = require('../middlewares/multer');
const authMiddleware = require('../middlewares/authMiddleware');
const adminRouter = express.Router();
// const  require('../middleware/;

//Login
adminRouter.post('/login', login);

//PRODUCTOS
adminRouter.get('/products', authMiddleware,getAllProducts); // Obtener todos los productos
adminRouter.get('/products/:id', authMiddleware, getProductById); // Obtener un producto por ID
// adminRouter.post('/products/create', createProduct); // Crear un nuevo producto
adminRouter.post('/products/create', authMiddleware, upload.array('imagenes', 2), createProduct); // Crear un nuevo producto
adminRouter.patch('/products/update/:id', authMiddleware, updateProduct); // Actualizar un producto por ID
adminRouter.delete('/products/delete/:id', authMiddleware, deleteProduct); // Eliminar un producto por ID

//IMÁGENES
adminRouter.get('/images', authMiddleware, getImages); //Listar imágenes
adminRouter.post('/images/upload', authMiddleware, upload.single('image'), uploadImage); //Cargar imágen

module.exports = adminRouter;
