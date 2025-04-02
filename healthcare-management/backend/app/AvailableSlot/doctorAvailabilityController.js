import express from 'express';
import * as doctorAvailabilityService from '../AvailableSlot/doctorAvailabilityService.js';

const router = express.Router();

router.post('/set-available-slots', async(req, res) => {
    const doctorId = req.userId;
    const { availableSlots } = req.body;
    try {
      const updatedAvailability = await doctorAvailabilityService.createDoctorAvailability(
        doctorId,
        availableSlots
      );
      res.status(200).json({
        success: true,
        message: 'Available slots set successfully',
        data: updatedAvailability,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
});

router.get('/available-slots', async(req, res) => {
    const doctorId = req.userId;
    try {
      const availableSlots = await doctorAvailabilityService.getDoctorAvailability(doctorId);
      res.status(200).json({
        success: true,
        data: availableSlots,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
});

router.patch('/update-slot', async(req, res) => {
    const doctorId = req.userId;
    const { day, startTime, endTime } = req.body;
    try {
      const updatedAvailability = await doctorAvailabilityService.updateSlot(
        doctorId,
        day,
        startTime,
        endTime
      );
      res.status(200).json({
        success: true,
        message: 'Slot updated successfully',
        data: updatedAvailability,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
});

export default router;
