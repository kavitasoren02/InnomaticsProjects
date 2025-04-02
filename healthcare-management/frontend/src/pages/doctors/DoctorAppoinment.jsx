import React, { useEffect, useState } from 'react';
import { _get, _put } from '../../Service/ApiServiceProvider';
import { formatDate } from '../../util/helper';

const DoctorAppoinment = () => {
    const [appointments, setAppoinments] = useState([])
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        const getData = async() => {
            try{
                const { data } = await _get('/appointments/doctor')
                setAppoinments(data.appointments)
            }
            catch (error){
                // Do Nothing
                console.log({error})
            }
        }
        getData()
    }, [update])

    const acceptAndReject = async(id, status) => {
        try{
            const object = {
                appointmentId: id,
                status : status === 'Accepted' ? 'Confirmed' : status === 'Completed' ? 'Completed' : 'Cancelled'
            }
            const { data } = await _put('/appointments/update-status', object)
            console.log({data})
            setUpdate(prev => prev + 1)
        }
        catch (error) {

        }
    }

  return (
    <div className="mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-8 text-blue-500">Doctor Appointments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div key={appointment._id} className={`shadow-md rounded-lg p-6 ${appointment.status === 'Cancelled' ? 'border border-red-600 bg-red-300' : appointment.status === 'Completed' ? 'border border-green-400 bg-white' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold text-blue-500 mb-2">{`${appointment.user.firstName} ${appointment.user.lastName}`}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Date:</strong> {formatDate(appointment.appointmentDate)}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Symptoms:</strong> {appointment.symptoms}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Reason For Visit:</strong> {appointment.reasonForVisit}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Notes:</strong> {appointment.notes}
            </p>
            {!['Cancelled', 'Completed'].includes(appointment.status) && <div className="flex justify-end">
              {appointment.status === 'Pending' ? <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer" onClick={() => acceptAndReject(appointment._id, 'Accepted')}>
                Accept
              </button> :
              <div className='flex gap-2'>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer" onClick={() => acceptAndReject(appointment._id, 'Rejected')}>
                  Reject
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer" onClick={() => acceptAndReject(appointment._id, 'Completed')}>
                  Completed
                </button>
              </div>}
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppoinment;
