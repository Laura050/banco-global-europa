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

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes publiques
app.use('/api/auth', authRoutes);

// Routes protégées
app.use('/api/users', authenticateUser, userRoutes);
app.use('/api/admin', authenticateUser, checkAdmin, adminRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a Banco Global Europa API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
