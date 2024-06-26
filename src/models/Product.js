const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  nombre: {type: String, required: true, trim: true},
  stock: {type: Number, required: true},
  precio: {type: Number, required: true},
  promocion: {type: Number, default: 0},
  categoria: {type: String, required: true},
  descripcion: {type: String, required: true},
  talle: {type: String, required: true},
//   imagenes: [{type: String, required: true}],
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
