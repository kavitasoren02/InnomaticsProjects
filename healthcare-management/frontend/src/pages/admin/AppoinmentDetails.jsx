import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { _get } from "../../Service/ApiServiceProvider";
import { formatDate } from "../../util/helper";

const AppoinmentDetails = () => {
    const {appoinmentId} = useParams()
    const [appoinment, setAppoinment] = useState()
    useEffect(() => {
        const getData = async(getAppoinmentById) => {
            try{
                const { data } = await _get(`/appointments/${appoinmentId}`)
                setAppoinment(data.appointment)
            }
            catch(error){

            }
        }
        appoinmentId && getData(appoinmentId)
    }, [appoinmentId])
    console.log({appoinment})
    return (
        <div className="p-6">
            <div className="bg-white w-full p-4 rounded-md">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold mb-4 text-blue-500">Appoinment Detail's</h2>
                    <h2 className={`text-3xl font-bold mb-4 ${appoinment?.status === 'Cancelled' ? 'text-red-500' : appoinment?.status === 'Completed' ? 'text-green-500' : 'text-gray-700'}`}>{appoinment?.status}</h2>
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2">Pateint Detail's</h3>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Patient Name : </span>{`${appoinment?.user?.firstName} ${appoinment?.user?.lastName}`}</p>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Date and Time : </span>{formatDate(appoinment?.appointmentDate)}</p>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Phone Number : </span>{appoinment?.user?.mobileNumber}</p>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Email : </span>{appoinment?.user?.email}</p>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Symptoms : </span>{appoinment?.symptoms}</p>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Reason For Visit : </span>{appoinment?.reasonForVisit}</p>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Notes : </span>{appoinment?.notes}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-2">Doctors Detail's</h3>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Doctor Name : </span>{appoinment?.doctor?.firstName} {appoinment?.doctor?.lastName}</p>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Doctor Specialization : </span>{appoinment?.doctor?.specialization}</p>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Doctor Mobile Number : </span>{appoinment?.doctor?.mobileNumber}</p>
                    <p className="text-md text-gray-500"><span className="font-bold text-black">Doctor Email : </span>{appoinment?.doctor?.email}</p>
                </div>
            </div>
        </div>
    )
}
export default AppoinmentDetails;