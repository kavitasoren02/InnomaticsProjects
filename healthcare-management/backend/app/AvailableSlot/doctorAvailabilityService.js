import DoctorAvailability from './model/AvailableSlotScheman.js';

export const createDoctorAvailability = async (doctorId, availableSlots) => {
  try {
    const isData = await getDoctorAvailability(doctorId)
    if(isData){
      return await updateDoctorAvailability(doctorId, availableSlots)
    }
    else{
      const newAvailability = new DoctorAvailability({
        doctor: doctorId,
        availableSlots,
      });

      const savedAvailability = await newAvailability.save();
      return savedAvailability;
    }
  } catch (error) {
    throw new Error('Error creating doctor availability: ' + error.message);
  }
};

export const getDoctorAvailability = async (doctorId) => {
  try {
    const availability = await DoctorAvailability.findOne({ doctor: doctorId });
    return availability;
  } catch (error) {
    throw new Error('Error retrieving doctor availability: ' + error.message);
  }
};

export const updateDoctorAvailability = async (doctorId, availableSlots) => {
  try {
    const updatedAvailability = await DoctorAvailability.findOneAndUpdate(
      { doctor: doctorId },
      { availableSlots },
      { new: true }
    );
    return updatedAvailability;
  } catch (error) {
    throw new Error('Error updating doctor availability: ' + error.message);
  }
};

export const deleteDoctorAvailability = async (doctorId) => {
  try {
    const deletedAvailability = await DoctorAvailability.findOneAndDelete({ doctor: doctorId });
    return deletedAvailability;
  } catch (error) {
    throw new Error('Error deleting doctor availability: ' + error.message);
  }
};

export const addSlotToDoctorAvailability = async (doctorId, day, slot) => {
  try {
    const availability = await DoctorAvailability.findOne({ doctor: doctorId });
    
    if (!availability) {
      throw new Error('Doctor availability not found');
    }

    const daySlot = availability.availableSlots.find((d) => d.day === day);

    if (daySlot) {
      daySlot.slots.push(slot);
    } else {
      availability.availableSlots.push({ day, slots: [slot] });
    }

    await availability.save();
    return availability;
  } catch (error) {
    throw new Error('Error adding slot to doctor availability: ' + error.message);
  }
};

export const removeSlotFromDoctorAvailability = async (doctorId, day, startTime) => {
  try {
    const availability = await DoctorAvailability.findOne({ doctor: doctorId });

    if (!availability) {
      throw new Error('Doctor availability not found');
    }

    const daySlot = availability.availableSlots.find((d) => d.day === day);

    if (daySlot) {
      daySlot.slots = daySlot.slots.filter((slot) => slot.startTime.toISOString() !== startTime);
      await availability.save();
      return availability;
    }

    throw new Error('Day not found in doctor availability');
  } catch (error) {
    throw new Error('Error removing slot from doctor availability: ' + error.message);
  }
};