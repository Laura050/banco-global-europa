const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtenir le profil utilisateur
router.get('/profile', async function(req, res) {
  try {
    const user = await User.findById(req.userData.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// Obtenir les informations du compte
router.get('/account', async function(req, res) {
  try {
    const user = await User.findById(req.userData.userId).select('numeroCuenta saldo estado');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cuenta' });
  }
});

// Obtenir l'historique des transactions
router.get('/transactions', async function(req, res) {
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Pour l'instant, nous retournons un tableau vide car nous n'avons pas encore implémenté les transactions
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
});

module.exports = router;
