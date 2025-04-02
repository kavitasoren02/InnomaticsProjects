import { useEffect, useState } from "react";
import { _get } from "../../Service/ApiServiceProvider";
import { date } from "yup";
import { formatDate } from "../../util/helper";

const UserAppoinments = () => {
    const [appoinments, setAppoinments] = useState([]);
    
    useEffect(() => {
        const getData = async() => {
            try{
                const {data} = await _get('/appointments/user/appointments')
                setAppoinments(data?.appointments)
            }
            catch (error) {
                // Do Nothing
            }
        }
        getData();
    }, [])
    
    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold text-white mb-6">Appoinment List</h1>
        
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full table-auto">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Doctor Name</th>
                    <th className="px-4 py-2 text-left">Symptoms</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appoinments?.length > 0 ? (
                    appoinments?.map((appoinment) => (
                      <tr key={appoinment._id} className={`not-last:border-b border-gray-300 ${appoinment.status === 'Cancelled' ? 'bg-red-200' : appoinment.status === 'Completed' ? 'bg-green-300' : 'bg-white'}`}>
                        <td className="px-4 py-2">{formatDate(appoinment.appointmentDate)}</td>
                        <td className="px-4 py-2">{`${appoinment.doctor.firstName} ${appoinment.doctor.lastName}`}</td>
                        <td className="px-4 py-2">{appoinment.symptoms}</td>
                        <td className="px-4 py-2">{appoinment.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-2 text-center">
                        No doctors available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        </div>
    )
}
export default UserAppoinments;