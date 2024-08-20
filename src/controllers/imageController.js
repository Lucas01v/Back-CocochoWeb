const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica el ID del parámetro
    console.log('ID recibido:', id);

    // Encuentra la imagen en la base de datos
    const image = await Image.findById(id);
    if (!image) {
      console.log('Imagen no encontrada con ID:', id);
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    // Verifica que se haya cargado un archivo
    console.log('Archivo recibido:', req.file);
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha cargado ningún archivo' });
    }

    // Elimina la imagen anterior de Cloudinary
    const public_id = image.url.split('/').pop().split('.')[0]; // Extrae el public_id de la URL
    console.log('ID público de la imagen a eliminar:', public_id);
    await cloudinary.uploader.destroy(public_id);

    // Sube la nueva imagen a Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            console.error('Error al subir imagen a Cloudinary:', error);
            reject(error);
          } else {
            console.log('Resultado de la carga en Cloudinary:', result);
            resolve(result);
          }
        }
      ).end(req.file.buffer); // Pasar el buffer del archivo
    });

    // Actualiza la URL de la imagen en la base de datos
    image.url = result.secure_url;
    await image.save();

    res.status(200).json({ message: 'Imagen actualizada con éxito', image });
  } catch (error) {
    console.error('Error en el controlador de actualización de imagen:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateImage };

  
  const getImages = async (req, res) => {
    try {
      const images = await Image.find();
      console.log('Fetched images:', images); // Log para verificar
      res.status(200).json(images);
    } catch (error) {
      console.error('Error fetching images:', error); // Log para errores
      res.status(500).json({ message: error.message });
    }
  };
  
  
  module.exports = { updateImage, getImages };