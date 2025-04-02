import Appointment from './model/AppoinmentSchema.js'; // Import the Appointment model
import { AppointmentStatusEnum } from '../enums/AppoinmentStatus.js'; // Import AppointmentStatusEnum

// Book an appointment
export const bookAppointment = async (userId, doctorId, appointmentDate, reasonForVisit, symptoms, notes) => {
  try {
    // Check if the appointment date is in the future
    if (new Date(appointmentDate) < new Date()) {
      throw new Error('Appointment date must be in the future');
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      user: userId,
      doctor: doctorId,
      appointmentDate,
      reasonForVisit,
      symptoms,
      notes,
    });

    // Save the appointment to the database
    await newAppointment.save();

    return newAppointment;
  } catch (error) {
    throw new Error(`Error booking appointment: ${error.message}`);
  }
};

// Get appoinment by id
export const getAppoinmentById = async (id) => {
  try {
    // Find the appointment by id
    const appointment = await Appointment.findById(id).populate('doctor').populate('user');
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    return appointment;
    } catch (error) {
      throw new Error(`Error getting appointment by id: ${error.message}`);
    }
}

// Get all appointments for a user
export const getAppointmentsForUser = async (userId) => {
  try {
    const appointments = await Appointment.find({ user: userId }).populate('doctor');
    return appointments;
  } catch (error) {
    throw new Error(`Error fetching appointments: ${error.message}`);
  }
};

// Get all appointments for a doctor
export const getAppointmentsForDoctor = async (doctorId) => {
  try {
    const appointments = await Appointment.find({ doctor: doctorId }).populate('user');
    return appointments;
  } catch (error) {
    throw new Error(`Error fetching doctor appointments: ${error.message}`);
  }
};

// Update appointment status (e.g., from Pending to Confirmed)
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    // Validate status
    if (!Object.values(AppointmentStatusEnum).includes(status)) {
      throw new Error('Invalid status');
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    appointment.status = status;
    appointment.updatedAt = new Date();
    await appointment.save();

    return appointment;
  } catch (error) {
    throw new Error(`Error updating appointment status: ${error.message}`);
  }
};

// Cancel an appointment
export const cancelAppointment = async (appointmentId) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    appointment.status = AppointmentStatusEnum.CANCELLED;
    appointment.updatedAt = new Date();
    await appointment.save();

    return appointment;
  } catch (error) {
    throw new Error(`Error canceling appointment: ${error.message}`);
  }
};

//  get All Appoinemnt
export const getAllAppointments = async () => {
  try {
    const appointments = await Appointment.find().populate('doctor').populate('user');
    return appointments;
  }
  catch (error) {
    throw new Error(`Error getting all appointments: ${error.message}`);
  }
}