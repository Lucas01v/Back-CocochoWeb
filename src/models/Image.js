const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
},{ collection: 'images' });

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
