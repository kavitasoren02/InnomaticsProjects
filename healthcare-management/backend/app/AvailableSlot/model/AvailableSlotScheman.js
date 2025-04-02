import mongoose from 'mongoose';

const DoctorAvailabilitySchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming the doctor is also a User in the system
      required: true,
    },
    availableSlots: [
      {
        day: {
          type: String,
          required: true, // Day of the week, e.g., "Monday"
        },
        slots: [
          {
            startTime: {
              type: String, // e.g., "2025-03-30T09:00:00Z"
              required: true,
            },
            endTime: {
              type: String, // e.g., "2025-03-30T09:30:00Z"
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const DoctorAvailability = mongoose.model('DoctorAvailability', DoctorAvailabilitySchema);

export default DoctorAvailability;
