import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { _get, _post } from "../../Service/ApiServiceProvider";
import { useFormik } from "formik";
import { AppoinmentSchema } from "./ValidateSchema";
import InputWithLabel from "../../components/InputWithLabel";

// Sample doctor data (this should ideally come from an API)
const doctorData = {
  name: "Dr. John Doe",
  specialization: "Cardiologist",
  experience: "10 years",
  contact: "+1234567890",
  bio: "Dr. John Doe is a renowned cardiologist with over 10 years of experience in treating heart-related issues.",
  availableSlots: [
    "2025-03-30 10:00",
    "2025-03-30 14:00",
    "2025-03-31 09:00",
    "2025-03-31 15:00",
  ],
};

const DoctorProfilePage = () => {
  const { doctorId } = useParams()
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const [doctor, setDoctor] = useState(undefined)

  const intitalState = {
    doctorId,
    appointmentDate : '',
    reasonForVisit : '',
    symptoms : '',
    notes: ''
  }

  const formik = useFormik({
    initialValues: intitalState,
    validationSchema: AppoinmentSchema,
    onSubmit: async(obj) => {
      try{
        const { data } = await _post('/appointments/book', obj)
        toast.success(data?.message)
      }
      catch (error){
        if(error.response.status == 401) {
          return toast.error('Please login your account to book an appointment.')
        }
        toast.warn(error?.response?.data?.message)
      }
    }
  })

  

  useEffect(() => {
    const getData = async() => {
        try{
            const {data} = await _get(`/user/doctor/${doctorId}`)
            setDoctor(data?.doctor[0])
        }
        catch (error){

        }
    }
    doctorId && getData();
  }, [doctorId])

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // Handle appointment booking
  const handleBookAppointment = () => {
    if (!selectedSlot) {
      toast.warn("Please select an available slot to book an appointment.");
      return;
    }
    // Here, you can make an API request to book the appointment
    toast.success(`Appointment booked successfully for ${selectedSlot}`);
  };

  const filterAvailable = (availabilities) => {
    return availabilities.filter((date) => date !== null) || []
  }

  const convertTo12HourFormat = (time24) => {
    let [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
  } 

  useEffect(() => {
    formik.setFieldValue('appointmentDate', selectedSlot?.startTime)
  }, [selectedSlot])

  return (
    <div className="min-h-screen p-6">
      <header className="mb-8 p-4 rounded-2xl shadow-sm bg-gray-700 flex gap-1 items-center">
        <img src={doctor?.images?.url || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"} className="w-40 h-40 rounded-full p-4"/>
        <div>
          <h1 className="text-3xl font-bold text-white">{`${doctor?.firstName} ${doctor?.lastName}`}</h1>
          <p className="text-xl text-gray-200">{doctor?.specialization}</p>
          <p className="text-sm text-gray-200">Contact: {doctor?.mobileNumber}</p>
          <p className="text-sm text-gray-200">Email: {doctor?.email}</p>
        </div>
      </header>

      {/* <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Doctor's Bio</h2>
        <p className="text-gray-700">{doctorData.bio}</p>
      </section> */}

        <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Slots</h2>
            <div className="flex flex-col gap-6">
                {doctor?.availabilities?.availableSlots.length > 0 ? (
                filterAvailable(doctor?.availabilities?.availableSlots).map((slot, index) => (
                  <div key={index}>
                    <h2 className="text-2xl text-white font-bold mb-2">{slot?.day}</h2>
                    <div className="grid grid-cols-12 gap-4">
                        {slot?.slots?.map((item, idx) => (
                        <button
                            onClick={() => handleSlotSelect(item)}
                            key={idx}
                            className={`py-2 px-10 rounded-md cursor-pointer lg:col-span-4 md:col-span-6 sm:col-span-12 col-span-12 w-full ${selectedSlot?._id === item?._id ? 'bg-blue-900 text-white' : 'bg-gray-700 text-white'} disabled:cursor-not-allowed`} disabled={Date.now() > new Date(item.endTime).getTime()}>
                            {`${convertTo12HourFormat(item?.startTime?.split("T")[1])} - ${convertTo12HourFormat(item?.endTime?.split("T")[1])}`}
                        </button>
                        ))}
                    </div>
                  </div>
                ))
                ) : (
                <p className="text-center text-gray-500 col-span-12">No available slots.</p>
                )}
            </div>
        </section>



      {doctor?.availabilities?.availableSlots.length > 0 && <section>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl font-semibold text-white mb-4">Book an Appointment</h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <InputWithLabel 
                label="Enter Reason For Visit."
                name="reasonForVisit"
                type="text"
                placeholder="Resion for Visit"
                value={formik.values.reasonForVisit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.reasonForVisit && formik.errors.reasonForVisit}
              />
            </div>
            <div className="mb-4">
              <InputWithLabel 
                label="Symptoms"
                name="symptoms"
                type="text"
                placeholder="Enter Symptoms"
                value={formik.values.symptoms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.symptoms && formik.errors.symptoms}
              />
            </div>
            <div className="mb-4">
              <InputWithLabel 
                label="Notes"
                name="notes"
                type="text"
                placeholder="Enter Notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.notes && formik.errors.notes}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </form>
      </section>}
    </div>
  );
};

export default DoctorProfilePage;
