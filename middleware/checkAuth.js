import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers.authorization.replace(/Bearer\s?/, '');
  res.send(token);
  if (token) {
    const decoded = jwt.verify(token, 'Shhhhh');
    req.userId = decoded._id;
    next()
  } else {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
