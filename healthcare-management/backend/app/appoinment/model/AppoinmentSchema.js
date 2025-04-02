import mongoose from 'mongoose';
import { AppointmentStatusEnum } from '../../enums/AppoinmentStatus.js'; // Import the enum

const AppointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming doctor is also a User, and we reference their ID here
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatusEnum), // Use the enum here
      default: AppointmentStatusEnum.PENDING, // Default value set to "Pending"
    },
    reasonForVisit: {
      type: String,
      trim: true,
    },
    symptoms: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;
