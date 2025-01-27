require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');
const { authenticateUser, checkAdmin } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route de base
app.get('/', function(req, res) {
  res.json({ message: 'Bienvenido a Banco Global Europa API' });
});

// Route health check
app.get('/health', function(req, res) {
  res.json({ status: 'ok' });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateUser, userRoutes);
app.use('/api/admin', authenticateUser, checkAdmin, adminRoutes);

// Gestion des erreurs
app.use(function(err, req, res, next) {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
