import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navbar } from '../navbar';

const GetAppliedJob = () => {
  const [appliedJobs,setAppliedJobs]=useState([]);
  console.log("PpliedJobs",appliedJobs);
  
  const [count,setCount]=useState(0);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const apiUrl = import.meta.env.VITE_USER_URL;
  const token=localStorage.getItem('accessToken') || localStorage.getItem('token')
  


  useEffect(()=>{
    const fetchAppliedJobs=async()=>{
      try{
        const response=await axios.get(`${apiUrl}/jobs/getappliedJob`,{
          headers:{
            Authorization:`Bearer ${token}`
          },
        });
        console.log("response",response);
        
        setAppliedJobs(response.data.data.application)
      }catch(error){
        console.error("error in getting job",error);
        
      }
    }
    fetchAppliedJobs()
  },[])
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-20">
      <Navbar/>
      <h1 className="text-2xl font-bold text-center mb-6 text-primary">Applied Jobs</h1>
  
      {appliedJobs.length === 0 ? (
        <p className="text-center text-gray-600">You have not applied to any jobs yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobs.map((appliedJob) => (
            <li
              key={appliedJob.applicationId}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-accent mb-2">
                {appliedJob.jobTitle}
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Company:</span> {appliedJob.companyName}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Location:</span> {appliedJob.location}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Expected CTC:</span> {appliedJob.expectedCTC}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Applied On:</span>{" "}
                {new Date(appliedJob.appliedAt).toLocaleDateString()}
              </p>

              {appliedJob.status === 'scheduled' && (
    <p className="text-green-600 font-medium mt-2">
      Interview Scheduled on:{" "}
      {appliedJob.scheduledDate
        ? new Date(appliedJob.scheduledDate).toLocaleString()
        : "Date not available"}
    </p>
  )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
}

export default GetAppliedJob
