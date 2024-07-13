const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Agregar un producto al carrito
exports.addToCart = async (req, res) => {
  const { productId, cantidad, email } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user ? req.user._id : null });

    if (!cart) {
      cart = new Cart({ userId: req.user ? req.user._id : null, email });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].cantidad += cantidad;
      cart.items[itemIndex].subtotal = (product.precio - (product.precio * (product.promocion / 100))) * cart.items[itemIndex].cantidad;
    } else {
      const subtotal = (product.precio - (product.precio * (product.promocion / 100))) * cantidad;
      cart.items.push({
        productId,
        nombre: product.nombre,
        cantidad,
        precio: product.precio,
        promocion: product.promocion,
        subtotal,
      });
    }

    // Calcular el total
    cart.total = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener el carrito del usuario
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user ? req.user._id : null }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto del carrito
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user ? req.user._id : null });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      // Recalcular el total
      cart.total = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ message: 'Producto no encontrado en el carrito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
