const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { uploadImage, getImages } = require('../controllers/imageController');
const upload = require('../middlewares/multer');
const getProductsByCarousel = require('../controllers/carruselController');
const adminRouter = express.Router();



//PRODUCTOS
adminRouter.get('/products', getAllProducts); // Obtener todos los productos
adminRouter.get('/products/:id', getProductById); // Obtener un producto por ID
// adminRouter.post('/products/create', createProduct); // Crear un nuevo producto
adminRouter.post('/products/create', upload.array('imagenes', 2), createProduct); // Crear un nuevo producto
adminRouter.patch('/products/update/:id',upload.array('imagenes', 2),  updateProduct); // Actualizar un producto por ID
adminRouter.delete('/products/delete/:id', deleteProduct); // Eliminar un producto por ID

//CARRUSEL DE IMÁGENES
adminRouter.get('/images', getImages); //Listar imágenes
adminRouter.post('/images/upload', upload.single('image'), uploadImage); //Cargar imágen

//CARRUSELES DE PRODUCTOS
adminRouter.get('/products/carousel/:type', getProductsByCarousel); //Acturalziar productos del carrusel

module.exports = adminRouter;
