const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

router.patch('/users/:id/validate', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { estado: 'activo', numeroCuenta: req.body.numeroCuenta },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al validar usuario' });
  }
});

router.patch('/users/:id/balance', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { saldo: req.body.saldo },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar saldo' });
  }
});

router.patch('/users/:id/block', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
});

module.exports = router;
