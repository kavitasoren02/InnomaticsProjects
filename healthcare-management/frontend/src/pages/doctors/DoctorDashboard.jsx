import { useEffect, useState } from "react";
import { useAuth } from "../../ProtectedRoute/AuthProvider";
import { _get, _post } from "../../Service/ApiServiceProvider";
import { toast } from "react-toastify";
import { gateTimeOnly, getDateAndTimeIST } from "../../util/helper";

const DoctorDashboard = () => {
  const { user } = useAuth();

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  // State to manage availability and selected time for each day
  const [schedule, setSchedule] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        available: false,
        slots: [], // Array to store multiple slots for each day
      };
      return acc;
    }, {})
  );

  // Toggle availability for a specific day
  const toggleAvailability = (day) => {
    setSchedule((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        available: !prevState[day].available,
      },
    }));
  };

  // Handle time change (add a new slot or update an existing one)
  const handleTimeChange = (day, index, timeType, value) => {
    const date = getDateAndTimeIST(day, value)
    console.log({date})
    setSchedule((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        slots: prevState[day].slots.map((slot, i) => {
          if (i === index) {
            return {
              ...slot,
              [timeType]: date,
            };
          }
          return slot;
        }),
      },
    }));
  };

  // Add a new slot for a specific day
  const addNewSlot = (day) => {
    setSchedule((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        slots: [...prevState[day].slots, { startTime: "", endTime: "" }],
      },
    }));
  };

  // Sample doctor info
  const doctorInfo = {
    name: `${user.firstName} ${user.lastName}`,
    specialization: `${user.specialization}`,
    photoUrl: user?.images?.url || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
    email: `${user.email}`,
    phone: `${user.mobileNumber}`,
  };

  // Submit the schedule data
  const onClickSubmit = async() => {
    const availableSlots = Object.keys(schedule).map(item => {
        if(schedule[item].available){
            return {
                day: item,
                slots: schedule[item].slots
            }
        }
    })
    
    try{
        const {data} = await _post('/availableSlots/set-available-slots', {availableSlots});
        toast.success(data?.message)
    }   
    catch (error){
        toast.warn(error?.response?.data?.message)
    }

  };

  useEffect(() => {
    const getData = async() => {
        try{
            const {data} = await _get('/availableSlots/available-slots')
            const val = {}
            data.data.availableSlots.forEach(item => {
                if(item){
                    val[item.day] = {
                        available: true,
                        slots: item.slots,
                    }
                }
            })
            setSchedule(prev => ({
                ...prev, 
                ...val
            }))
        }
        catch (error) {

        }
    }
    getData()
  }, [])
  console.log({schedule})
  return (
    <div className="w-full mx-auto p-6">
      {/* Doctor Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center space-x-6">
        <img
          src={doctorInfo.photoUrl}
          alt={doctorInfo.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{doctorInfo.name}</h2>
          <p className="text-lg text-gray-600">{doctorInfo.specialization}</p>
          <p className="text-sm text-gray-500 mt-1">{doctorInfo.email}</p>
          <p className="text-sm text-gray-500">{doctorInfo.phone}</p>
        </div>
      </div>

      <h1 className="text-4xl font-semibold text-blue-600 mb-6">Manage Doctor Availability</h1>
      <p className="text-lg mb-8 text-gray-600">Select your availability and working hours for each day:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`transition duration-300 transform p-6 rounded-xl shadow-lg cursor-pointer
              ${schedule[day].available ? "bg-green-100 border-green-500" : "bg-gray-100 border-gray-300"} 
              hover:scale-105 hover:shadow-xl hover:border-green-300 border-2`}
          >
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800">{day}</h3>
              <div className={`mt-2 text-sm font-medium ${schedule[day].available ? "text-green-600" : "text-gray-600"}`}>
                {schedule[day].available ? "Available" : "Not Available"}
              </div>

              {/* Time Picker Inputs */}
              {schedule[day].available && (
                <div className="mt-4 w-full">
                  {/* Render the time slots for the day */}
                  {schedule[day].slots.map((slot, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex justify-between">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700">Start Time</label>
                          <input
                            type="time"
                            value={gateTimeOnly(slot.startTime)}
                            onChange={(e) => handleTimeChange(day, index, "startTime", e.target.value)}
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700">End Time</label>
                          <input
                            type="time"
                            value={gateTimeOnly(slot.endTime)}
                            onChange={(e) => handleTimeChange(day, index, "endTime", e.target.value)}
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Button to add a new slot */}
                  <div className="mt-4 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
                      onClick={() => addNewSlot(day)}
                    >
                      Add New Slot
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Expand/Collapse Button */}
            <div className="mt-4 text-center">
              <button
                className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
                onClick={() => toggleAvailability(day)}
              >
                {schedule[day].available ? "Remove" : "Add"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300" onClick={onClickSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
