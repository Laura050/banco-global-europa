const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtenir tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Valider le compte d'un utilisateur
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

// Mettre à jour le solde
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

// Bloquer/débloquer un compte
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

// Promouvoir un utilisateur en administrateur
router.patch('/users/:id/promote', async (req, res) => {
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
