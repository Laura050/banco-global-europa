const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Liste des utilisateurs
router.get('/users', async function(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Validation de compte
router.patch('/users/:id/validate', async function(req, res) {
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

// Mise à jour du solde
router.patch('/users/:id/balance', async function(req, res) {
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

// Blocage/déblocage de compte
router.patch('/users/:id/block', async function(req, res) {
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

// Promotion en administrateur
router.patch('/users/:id/promote', async function(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isAdmin: true,
        estado: 'activo'
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al promover usuario' });
  }
});

module.exports = router;
