import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../navbar';
import { FaMapMarkerAlt, FaMoneyBillWave, FaCity, FaGift } from "react-icons/fa";
const GetJobDetails = () => {
  const [employeeJobDetails,setEmployeeDetails]=useState()
  console.log("dgffhd",employeeJobDetails);
  
  const {id}=useParams()
  const navigate=useNavigate()
  
  
  const apiUrl = import.meta.env.VITE_USER_URL;
  console.log(apiUrl);
  

    const fetchJobDetails=async()=>{
      try{
        const response=await axios.get(`${apiUrl}/jobs/getUser-jobDetails/${id}`)
        console.log("res",response.data);
        setEmployeeDetails(response.data.data)
        
      }catch(error){

      }
    }

    useEffect(()=>{
      fetchJobDetails()
    },[])
  const handleBack=()=>{
    navigate(-1)
  }

  return (
    <div>
      <Navbar />
      <button onClick={handleBack} className='text-black text-2xl absolute top-4 left-4 z-10 cursor-pointer  mt-44 ml-96'>⇦</button>
      <div className='max-w-xl mx-auto mt-48 p-9 bg-white rounded-lg shadow-lg relative'>
  
      {employeeJobDetails && (
        <div className="p-4">
          <h1 className="text-3xl font-bold text-primary mt-4">
            {employeeJobDetails.jobTitle}
          </h1>
          <h2 className="text-xl text-gray-800">{employeeJobDetails.companyName}</h2>
  
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600 flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span className="font-medium">Location:</span> {employeeJobDetails.jobs_location}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <FaMoneyBillWave className="mr-2" />
              <span className="font-medium">Salary:</span> ₹{employeeJobDetails.minPay} - ₹{employeeJobDetails.maxPay} {employeeJobDetails.rate}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <FaCity className="mr-2" />
              <span className="font-medium">City:</span> {employeeJobDetails.city}, {employeeJobDetails.area}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <FaGift className="mr-2" />
              <span className="font-medium">Benefits:</span> {employeeJobDetails.benefits}
            </p>
          </div>
        </div>
      )}
      </div>
    </div>

  );
  }

export default GetJobDetails
