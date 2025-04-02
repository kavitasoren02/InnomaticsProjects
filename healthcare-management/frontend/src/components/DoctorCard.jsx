import React from "react";
import { FaStar } from "react-icons/fa"; // Star icon for rating
import { Navigate, useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  // const { firstName, lastName, specialization, rating = 4.5, image, _id } = doctor;
  const navigate = useNavigate()

  return (
    <div className="max-w-full rounded-lg shadow-md overflow-hidden bg-gray-700">
      {/* Doctor's Image */}
    <div className="w-full flex justify-center items-center">
        <img
          src={doctor?.images?.url || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"}
          alt={doctor.firstName}
          className="w-48 h-48 object-cover rounded-full p-4"
        />
    </div>

      <div className="p-4">
        {/* Doctor's Name and Specialization */}
        <h3 className="text-xl font-semibold text-white">{`${doctor.firstName} ${doctor.lastName}`}</h3>
        <p className="text-sm text-gray-200">{doctor.specialization}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-500" />
          <span className="ml-2 text-sm text-gray-200">4.5</span>
        </div>

        {/* Book Appointment Button */}
        <button
          className="mt-4 w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => {
            navigate(`/doctor-profile/${doctor._id}`) 
         }}
        >
          See More...
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
