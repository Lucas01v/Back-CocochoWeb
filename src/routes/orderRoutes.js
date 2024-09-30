// src/routes/orderRoutes.js
const express = require('express');
const Product = require('../models/Product');
const orderRouter = express.Router();

orderRouter.post('/process-order', async (req, res) => {
    try {
        const { cartItems } = req.body;

        for (const item of cartItems) {
            const product = await Product.findById(item.id);

            // Verificar si hay suficiente stock
            if (product.stock >= item.quantity) {
                // Reducir el stock
                product.stock -= item.quantity;
                await product.save();
            } else {
                return res.status(400).json({ message: `No hay suficiente stock para el producto: ${product.nombre}` });
            }
        }

        res.status(200).json({ message: 'Compra procesada y stock actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error procesando la compra', error });
    }
});

module.exports = orderRouter;
