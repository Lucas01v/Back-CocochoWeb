const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { uploadImage, getImages, updateImage } = require('../controllers/imageController');
const { login } = require('../controllers/authController');
const upload = require('../middlewares/multer');
const getProductsByCarousel = require('../controllers/carruselController');
const adminRouter = express.Router();


//Login
adminRouter.post('/login', login);

//PRODUCTOS
adminRouter.get('/products', getAllProducts); // Obtener todos los productos
adminRouter.get('/products/:id', getProductById); // Obtener un producto por ID
// adminRouter.post('/products/create', createProduct); // Crear un nuevo producto
adminRouter.post('/products/create', upload.array('imagenes', 2), createProduct); // Crear un nuevo producto
adminRouter.patch('/products/update/:id',upload.array('imagenes', 2),  updateProduct); // Actualizar un producto por ID
adminRouter.delete('/products/delete/:id', deleteProduct); // Eliminar un producto por ID

//CARRUSEL DE IMÁGENES
adminRouter.get('/images', getImages); //Listar imágenes
adminRouter.put('/images/:id', upload.single('image'), updateImage); //Cargar imágen

//CARRUSELES DE PRODUCTOS
adminRouter.get('/products/carousel/:type', getProductsByCarousel); //Acturalziar productos del carrusel

module.exports = adminRouter;
