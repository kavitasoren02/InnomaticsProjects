import { useEffect, useState } from "react"
import { _get } from "../../Service/ApiServiceProvider"
import { GET_DOCTORS, GET_USER } from "../../Service/useApiService"
import { useNavigate } from "react-router-dom"

const UserDashboard = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async() => {
            try{
                const {data} = await _get(GET_USER)
                setUsers(data?.users ?? [])
            }
            catch (error){

            }
        }   
        getData()
    }, [])
    
    return (
        <div className="p-6">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">User List</h1>
  
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile Number</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="not-last:border-b border-gray-300">
                    <td className="px-4 py-2">{user.firstName}</td>
                    <td className="px-4 py-2">{user.lastName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.mobileNumber}</td>
                    <td className="px-4 py-2">{user.isActive ? 'active' : 'deactive'}</td>
                    <td className="px-4 py-2">
                      <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600" onClick={() => {
                        navigate(`/admin/user/${user._id}`)
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
export default UserDashboard