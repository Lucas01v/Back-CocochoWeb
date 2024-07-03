const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        }).end(req.file.buffer);
      });
  
      const newImage = new Image({ url: result.secure_url });
      await newImage.save();
  
      res.status(200).json({ message: 'Imagen cargada exitosamente', imageUrl: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getImages = async (req, res) => {
    try {
      const images = await Image.find();
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { uploadImage, getImages };