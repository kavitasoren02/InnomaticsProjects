import { useEffect, useState } from "react"
import { _get } from "../../Service/ApiServiceProvider"
import { GET_DOCTORS } from "../../Service/useApiService"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async() => {
            try{
                const {data} = await _get(GET_DOCTORS)
                setDoctors(data?.doctor ?? [])
            }
            catch (error){

            }
        }   
        getData()
    }, [])
    
    return (
        <div className="p-6">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">Doctors List</h1>
  
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile Number</th>
                <th className="px-4 py-2 text-left">Specilization</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <tr key={doctor.id} className="not-last:border-b border-gray-300">
                    <td className="px-4 py-2">{doctor.firstName}</td>
                    <td className="px-4 py-2">{doctor.lastName}</td>
                    <td className="px-4 py-2">{doctor.email}</td>
                    <td className="px-4 py-2">{doctor.mobileNumber}</td>
                    <td className="px-4 py-2">{doctor.specialization}</td>
                    <td className="px-4 py-2">{doctor.approval ? 'active' : 'deactive'}</td>
                    <td className="px-4 py-2">
                      <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600" onClick={() => {
                        navigate(`/admin/doctor/${doctor._id}`)
                      }}>
                        View
                      </button>
                    </td>
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
export default AdminDashboard