const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/profile', auth, async (req, res) => {
 try {
   const user = await User.findById(req.userData.userId).select('-password');
   if (!user) {
     return res.status(404).json({ error: 'Usuario no encontrado' });
   }
   res.json(user);
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
});

router.get('/account', auth, async (req, res) => {
 try {
   const user = await User.findById(req.userData.userId).select('numeroCuenta saldo estado');
   if (!user) {
     return res.status(404).json({ error: 'Usuario no encontrado' });
   }
   res.json(user);
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
});

module.exports = router;
