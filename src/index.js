//DEPENDENCIAS
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

//CONEXIONES Y RUTAS
const connectDB = require('./config/db');//conexión a la bd
const adminRouter = require('./routes/adminRoutes');

app.use(morgan('combined')); //Uso de morgan

require('dotenv').config(); //Lectura de variables de entorno

app.use(express.json());

//CONFIGURACIÓN DE CORS
app.use(cors({
    origin: 'https://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//RUTAS
app.use('/admin', adminRouter);

// Manejar errores de multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });

// CONEXIÓN A BD
connectDB(); 

    // Iniciar el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
