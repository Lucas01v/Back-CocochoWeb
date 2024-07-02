const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// Crear un nuevo producto
/* const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({message: 'Producto creado exitosamente', producto: product});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; */

const createProduct = async (req, res) => {
  try {
    const { nombre, stock, precio, promocion, categoria, descripcion, talle } = req.body;
    let imagenes = [];

    if (req.files) {
      const uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream((error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }).end(file.buffer);
        });
      });

      imagenes = await Promise.all(uploadPromises);
    }

    const product = new Product({ nombre, stock, precio, promocion, categoria, descripcion, talle, imagenes });
    await product.save();
    res.status(201).json({ message: 'Producto creado exitosamente', producto: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto por ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById ,updateProduct, deleteProduct};