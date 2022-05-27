const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json('Нет доступа headers');
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(401).json('неверный тип токена');
  }

  try {
    req.user = jwt.verify(token, process.env.SECRET_JWT);
    next();
  } catch (e) {
    res.status(401).json(`Неверный токен в authMiddlewares: ${e.toString()}`);
  }
};
