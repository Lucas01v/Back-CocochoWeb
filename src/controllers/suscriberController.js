const Subscriber = require('../models/Suscriber');

exports.addSubscriber = async (req, res) => {
  const { name, email } = req.body;

  try {
    let subscriber = new Subscriber({ name, email });
    await subscriber.save();
    console.log('USUARIO SUSCRITO')
     // Enviar correo de confirmación
    sendConfirmationEmail(name, email);
    res.status(201).json(subscriber);
  } catch (error) {
    console.error('Error adding subscriber:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    console.error('Error getting subscribers:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
