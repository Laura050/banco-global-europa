require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
 res.json({ message: 'Bienvenido a Banco Global Europa API' });
});

app.get('/health', (req, res) => {
 res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
