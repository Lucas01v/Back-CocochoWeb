const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1,
  },
  precio: {
    type: Number,
    required: true,
  },
  promocion: {
    type: Number,
    default: 0,
  },
  subtotal: {
    type: Number,
    required: true,
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  items: [cartItemSchema],
  email: {
    type: String,
    required: false,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Cart', cartSchema);
