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
  devise: { type: String, default: '€' },
  saldo: { type: Number, default: 0 },
  estado: { type: String, default: 'pendiente' },
  showCodeInput: { type: Boolean, default: false },
  showCodeInput: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
});
module.exports = mongoose.model('User', userSchema);
