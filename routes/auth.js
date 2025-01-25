const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hash
    });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error de registro' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ dni: req.body.dni });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error de login' });
  }
});

module.exports = router;
