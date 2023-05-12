const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = '1h';
  return jwt.sign(payload, secretKey, { expiresIn });
};

module.exports = generateToken;