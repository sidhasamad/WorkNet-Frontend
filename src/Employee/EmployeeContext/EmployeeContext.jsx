import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const EmployeeJobContext = createContext();
export const JobSeekerProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_USER_URL;
  const [savedJobs,setSavedJobs]=useState([])
  console.log("savedjobs",savedJobs);
  const userSaved = async ({ jobId }) => {
  const token=localStorage.getItem('accessToken') || localStorage.getItem('token')
  console.log("token",token);

  if(!token){
    console.error("token not found");
    return;    
  }
    try {
      const res = await axios.post(
        `${apiUrl}/jobs/userSaved/${jobId}`,
        
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast(res?.data?.message)
      console.log("saving job",res.data)
      return res.data;
    } catch (error) {
      console.error(
        "Save job error:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };
  //===============================================getSaved============================
  const getSaved=async()=>{
    const token=localStorage.getItem('accessToken') || localStorage.getItem('token')
    if(!token){
      console.error('Token not found');
      return;
      
    }
    try{
      const response=await axios.get(`${apiUrl}/jobs/getuserSaved`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setSavedJobs(response.data.data)
    }catch(error){
      console.error('Fetching error while get the job',error);
      
    }
  }
  return (
    <EmployeeJobContext.Provider value={{ userSaved,savedJobs,getSaved }}>
      {children}
    </EmployeeJobContext.Provider>
  );
};
export const useEmployeeJobContext = () => useContext(EmployeeJobContext);

