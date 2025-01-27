const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decoded.userId, isAdmin: decoded.isAdmin };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

const checkAdmin = (req, res, next) => {
  if (req.userData && req.userData.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Acceso denegado - requiere privilegios de administrador' });
  }
};

module.exports = {
  authenticateUser,
  checkAdmin
};
