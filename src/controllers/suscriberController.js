const Subscriber = require('../models/Subscriber');

exports.addSubscriber = async (req, res) => {
  const { name, email } = req.body;

  try {
    let subscriber = new Subscriber({ name, email });
    await subscriber.save();
    res.status(201).json(subscriber);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
