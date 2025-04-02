import { setCookie, removeCookie } from './CookiesService.js';
import { getUserByEmail, getUserById } from '../user/UserService.js';
import * as bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    setCookie(res, 'token', token);

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = (req, res) => {
  removeCookie(res, 'token');
  res.status(200).json({ message: 'Logout successful' });
};

const generateToken = (id) =>{
  return JWT.sign({userId: id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
}

export const getUserInfo = async(req, res) => {
  const id = req.userId;
  const user = await getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
}