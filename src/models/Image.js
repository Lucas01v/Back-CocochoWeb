const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
},{ collection: 'imagesCarrusel' });

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
