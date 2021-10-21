const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isValid = await jwt.verify(token, 'Secretkey');
    req.body.user_id = isValid.user_id;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
