//DEPENDENCIAS
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const app = express();

//CONEXIONES Y RUTAS
const connectDB = require('./config/db');//conexión a la bd
const adminRouter = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
// const userRouter = require('./routes/userRoutes');

app.use(morgan('combined')); //Uso de morgan

require('dotenv').config(); //Lectura de variables de entorno

app.use(express.json());

//CONFIGURACIÓN DE CORS
app.use(cors({
    origin: ['http://localhost:5173', 'https://705f-181-80-25-70.ngrok-free.app', 'https://cocochoweb.vercel.app'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//RUTAS
app.use('/auth', adminRouter);
app.use('/admin', adminRouter);
// app.use('/user', userRouter);

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

// Aumentar el tiempo de espera de la solicitud
const PORT = process.env.PORT;
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.setTimeout(2 * 60 * 1000); //Tiempo de espera