import express from 'express'
import UserController from '../user/UserController.js'
import AuthController from '../auth/AuthController.js'
import AppoinmentController from '../appoinment/AppoinmentController.js'
import AvailableSlots from '../AvailableSlot/doctorAvailabilityController.js'
import UploadFile from '../files/UploadFilesController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router();

router.use('/user', UserController)

router.use('/auth', AuthController)

router.use('/appointments', authenticate, AppoinmentController)

router.use('/availableSlots', authenticate, AvailableSlots)

router.use('/doctor', UserController)

router.use('/file', UploadFile)

export default router;