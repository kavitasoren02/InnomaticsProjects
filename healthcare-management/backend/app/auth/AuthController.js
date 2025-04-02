import express from 'express'
import { getUserInfo, loginUser, logoutUser } from './AuthService.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);

router.get('/logout', logoutUser)

router.get('/info', authenticate, getUserInfo)

export default router;