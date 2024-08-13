const Product = require ('../models/Product');

// Obtener productos para un carrusel específico
const getProductsByCarousel = async (req, res) => {
    const { type } = req.params;
  
    try {
      // Filtra los productos que contengan el valor 'type' en el array 'carousel'
      const products = await Product.find({ carousel: type });
      if (products.length === 0) {
        return res.status(404).send(`No se encontraron productos para el carrusel: ${type}`);
      }
      res.send(products);
    } catch (error) {
      res.status(500).send('Error obteniendo los productos');
    }
  };
  
module.exports = getProductsByCarousel;