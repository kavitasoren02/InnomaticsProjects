import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDoctorsOnly,
  getDoctorWithAvailability,
  getDoctorWithSpecialization,
} from './UserService.js';
import { validateUserRegistration } from './validation/validateUser.js';
import { extractMongooseError } from '../utils/helper.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST: Create a new user
router.post('/register', validateUserRegistration, async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', extractMongooseError(error));
    res.status(500).json({ message: extractMongooseError(error) || 'Server error' });
  }
});

// GET: Get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', extractMongooseError(error));
    res.status(500).json({ message: extractMongooseError(error) || 'Server error' });
  }
});

router.get('/doctor', async(req, res) => {
  try{
    const doctor = await getDoctorsOnly()
    return res.status(200).json({doctor})
  }
  catch (error){
    console.error('Error deleting user:', extractMongooseError(error));
    res.status(500).json({ message: extractMongooseError(error) || 'Server error' });
  }
})

router.get('/doctor/:doctorId', async(req, res) => {
  const { doctorId } = req.params
  try{
    const doctor = await getDoctorWithAvailability(doctorId)
    return res.status(200).json({doctor})
  }
  catch (error) {
    console.error('Error fetching user by ID:', extractMongooseError(error));
    res.status(500).json({ message: extractMongooseError(error) || 'Server error' });
  }
})

router.get('/doctor-specialization', async(req, res) => {
  try{
    const content = await getDoctorWithSpecialization()
    return res.status(200).json(content)
  }
  catch(error){
    console.error('Error fetching user by ID:', extractMongooseError(error));
    res.status(500).json({ message: extractMongooseError(error) || 'Server error' });
  }
})

// GET: Get user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user by ID:', extractMongooseError(error));
    res.status(500).json({ message: extractMongooseError(error) || 'Server error' });
  }
});

// PUT: Update user by ID
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await updateUser(id, req.body, req.userId);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', extractMongooseError(error));
    res.status(500).json({ message: extractMongooseError(error) || 'Server error' });
  }
});

// PATCH: Soft delete user by ID
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id, req.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User successfully deleted', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', extractMongooseError(error));
    res.status(500).json({ message: extractMongooseError(error) || 'Server error' });
  }
});



export default router;
