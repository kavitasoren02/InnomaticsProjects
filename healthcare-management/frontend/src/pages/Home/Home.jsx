import React, { useState, useEffect } from "react";
import DoctorCard from "../../components/DoctorCard";
import { _get } from "../../Service/ApiServiceProvider";

const Home = () => {
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    // Simulating an API call
    const getAllDoctors = async() => {
        try{
            const {data} = await _get('/user/doctor-specialization')
            setDataSet(data)
        }
        catch (error){
            console.log({error})
        }
    }

    getAllDoctors()
  }, []);
  console.log({dataSet})
  return (
    <div className="p-6">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Doctor's based on Specialization
        </h1>
        <p className="text-gray-300 mt-2">
          Find the best doctors for your needs
        </p>
      </header>

      {/* Doctor Cards Grid */}
      <div className="">
        {dataSet?.length > 0 ? (
          dataSet?.map((item, index) => (
            <>
              <h1 className="text-2xl text-white font-bold m-5">{item._id}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                  item.doctors.map((doctor, index) => (
                    <DoctorCard key={index} doctor={doctor} />
                  ))
                }
              </div>  
            </>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No doctors available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
