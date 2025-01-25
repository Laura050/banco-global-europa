const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  telefono: String,
  email: { type: String, unique: true },
  dni: { type: String, unique: true },
  pais: String,
  ciudad: String,
  codigoPostal: String,
  domicilio: String,
  password: String,
  numeroCuenta: String,
  saldo: { type: Number, default: 0 },
  estado: { type: String, default: 'pendiente' }
});

module.exports = mongoose.model('User', userSchema);
