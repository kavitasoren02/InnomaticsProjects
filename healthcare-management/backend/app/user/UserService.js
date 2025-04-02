import mongoose, { mongo } from 'mongoose';
import { ROLE_ENUMS } from '../enums/role.js';
import UserModal from './modals/User.js';
import * as bcrypt from 'bcryptjs';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Create a new user (POST)
export const createUser = async (data) => {
  const { firstName, lastName, email, mobileNumber, password, role, specialization } = data;
  
  // Check if the email already exists
  const existingUser = await UserModal.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModal({
    firstName,
    lastName,
    email,
    mobileNumber,
    password: hashedPassword,
    role,
    specialization,
    approval: role === ROLE_ENUMS.DOCTOR ? false : true
  });

  try {
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error; // Let the controller handle the response and log the error
  }
};

// Get all users (GET)
export const getAllUsers = async () => {
  try {
    return await UserModal.find({ isDeleted: false, role: ROLE_ENUMS.USER }, {password: 0}).populate('images');
  } catch (error) {
    throw error; // Let the controller handle the response and log the error
  }
};

// Get user by ID (GET)
export const getUserById = async (id) => {
  try {
    return await UserModal.findById(id).populate('images');
  } catch (error) {
    throw error; // Let the controller handle the response and log the error
  }
};

// Get user by email (GET)
export const getUserByEmail = async (email) => {
  try {
    return await UserModal.findOne({email, isDeleted: false, isActive: true}).populate('images');
  } catch (error) {
    throw error; // Let the controller handle the response and log the error
  }
};

// Update user (PUT)
export const updateUser = async (id, body, updatedBy) => {

  try {
    const updatedUser = await UserModal.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedAt: Date.now(),
        updatedBy,  // Assuming updatedBy is passed in the request
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error; // Let the controller handle the response and log the error
  }
};

// Soft delete user (PATCH)
export const deleteUser = async (id, deletedBy) => {
  try {
    const deletedUser = await UserModal.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: Date.now(),
        deletedBy,
        updatedAt: Date.now(),
        updatedBy,
      },
      { new: true }
    );
    return deletedUser;
  } catch (error) {
    throw error; // Let the controller handle the response and log the error
  }
};

export const getDoctorsOnly = async() => {
  try{
    const doctors = await UserModal.find({role: ROLE_ENUMS.DOCTOR}, {password: 0}).populate('images')
    return doctors;
  }
  catch (error) {
    throw error;
  }
}

export const getDoctorWithAvailability = async(doctorId) => {
  try{
    const doctor = await UserModal.aggregate([
      {
        $match: {
          _id: new mongo.ObjectId(doctorId)
        }
      },
      {
        $lookup: {
          from: 'images', 
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $unwind: {
          path: '$images',
          preserveNullAndEmptyArrays: true 
        }
      },
      {
        $lookup: {
          from: 'doctoravailabilities',
          localField: '_id',
          foreignField: 'doctor',
          as: 'availabilities'
        }
      },
      {
        $unwind: {
          path: '$availabilities',
          preserveNullAndEmptyArrays: true 
        }
      }
    ])
    return doctor
  }
  catch(error){
    throw error;
  }
}

export const getDoctorWithSpecialization = async() => {
  try{
    const doctors = await UserModal.aggregate([
      {
        $match: {
          role: 'doctor',
          specialization: { 
            $ne: null 
          },
          isDeleted: false,
          isActive: true
        }
      },
      {
        $lookup: {
          from: 'images', 
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $unwind: {
          path: '$images',
          preserveNullAndEmptyArrays: true 
        }
      },
      {
        $group: {
          _id: '$specialization',
          doctors: { $push: '$$ROOT' }
        }
      },
    ])
    return doctors;
  }
  catch(error){
    throw error;
  }
}