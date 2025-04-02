import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UNAUTHORISE_ACCESS } from '../enums/message.js';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY


export const authenticate = (req, res, next) => {
  
  const token = req.cookies['token'];
    
  if (!token) {
    return res.status(401).json({ message: UNAUTHORISE_ACCESS });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: UNAUTHORISE_ACCESS });
  }
};
