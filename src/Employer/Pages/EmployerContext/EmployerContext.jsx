import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const jobPostContext=createContext()
export const JobProvider=({children})=>{
  // const [postedJobs,setPostedJobs]=useState([])
  const api_url = import.meta.env.VITE_EMPLOYER_URL;

  const deleteJob=async(id)=>{
    try{
     await  axios.delete(`${api_url}/jobPost/deleteJobPost/${id}`)
      // setPostedJobs(prevJobs => prevJobs.filter(job => job._id !== id))
      window.location.href = '/jobPost';
      toast('Job deleted!')
    }catch(error){
      toast.error('Failed to delete job')
    }
  };

  return(
    <jobPostContext.Provider value={{deleteJob}}>
      {children}
    </jobPostContext.Provider>
  )
}
export const useJobContext = () => useContext(jobPostContext);