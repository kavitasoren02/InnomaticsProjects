import express from 'express';
import * as appointmentService from './AppoinmentService.js';

const router = express.Router();

// Route for booking an appointment
router.post('/book', async(req, res) => {
    const userId = req.userId;
    const {doctorId, appointmentDate, reasonForVisit, symptoms, notes } = req.body;

    try {
      if(!userId) {
        return res.status(404).json({ message: 'Please login to book an appointment.' });
      }

      const appointment = await appointmentService.bookAppointment(
        userId,
        doctorId,
        appointmentDate,
        reasonForVisit,
        symptoms,
        notes
      );
      res.status(201).json({
        success: true,
        message: 'Appointment booked successfully',
        data: appointment,
      });
    } catch (error) {Unauthorized
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  
});

router.get('/get-all', async(req, res) => {
  try{
    const appointments = await appointmentService.getAllAppointments();
    res.status(200).json({appointments});
  }
  catch(error){
    res.status(400).json({message: error.message});
  }
})

router.get('/user/appointments', async(req, res) => {
  const userId = req.userId;
  console.log({userId})
  try{
    const appointments = await appointmentService.getAppointmentsForUser(userId);
    res.status(200).json({appointments});
  }
  catch (error){
    res.status(400).json({message: error.message});
  }
})

// Route for getting all appointments of a user
router.get('/user/:userId', async(req, res) => {
    const { userId } = req.params;

    try {
      const appointments = await appointmentService.getAppointmentsForUser(userId);
      res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
});

router.get('/doctor', async(req, res) => {
  const doctorId = req.userId;
  try{
    const appointments = await appointmentService.getAppointmentsForDoctor(doctorId);
    console.log({doctorId, appointments})
    res.status(200).json({
      appointments
    });
  }
  catch (error){
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
})

// Route for getting all appointments of a doctor
router.get('/doctor/:doctorId', (req, res) => {
    const { doctorId } = req.params;

    try {
      const appointments = appointmentService.getAppointmentsForDoctor(doctorId);
      res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
});

// Get Appoinment by Id
router.get('/:appointmentId', async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await appointmentService.getAppoinmentById(appointmentId);
    res.status(200).json({
      appointment
    });
  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
})

// Route for updating appointment status
router.put('/update-status', async(req, res) => {
    const { appointmentId, status } = req.body;

    try {
      const appointment = await appointmentService.updateAppointmentStatus(appointmentId, status);
      res.status(200).json({
        success: true,
        message: 'Appointment status updated successfully',
        data: appointment,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
});

// Route for cancelling an appointment
router.patch('/cancel', async(req, res) => {
    const { appointmentId } = req.body;

    try {
      const appointment = await appointmentService.cancelAppointment(appointmentId);
      res.status(200).json({
        success: true,
        message: 'Appointment cancelled successfully',
        data: appointment,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
});

export default router;
