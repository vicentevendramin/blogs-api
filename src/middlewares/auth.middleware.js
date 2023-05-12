const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: 'Token not found' });

  try {
    req.user = jwt.verify(auth, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { authMiddleware };