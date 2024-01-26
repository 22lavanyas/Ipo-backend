const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { token, email, name, timestamp } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const jwtToken = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(201).json({ message: 'Data saved successfully', email:email, token: jwtToken });
    }

    const newUser = new User({ 
      token,
      email,
      name,
      timestamp,
    });

    await newUser.save();

    const jwtToken = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Data saved successfully:', newUser);

    res.status(201).json({ message: 'Data saved successfully', token: jwtToken });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addPan = async (req, res) => {
  try {

    const { name, panNo, email } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.panData.push({ name, panno: panNo });
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error adding PAN:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPan = async (req, res) => {
  try {
    const email = req.query.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.panData);
  } catch (error) {
    console.error('Error retrieving PAN data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  login,
  addPan,
  getPan
};
