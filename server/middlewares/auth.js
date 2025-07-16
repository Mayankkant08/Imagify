import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.json({ success: false, message: 'Invalid token' });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export default userAuth;
