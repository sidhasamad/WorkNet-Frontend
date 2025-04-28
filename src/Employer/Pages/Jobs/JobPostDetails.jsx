import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmployerNavbar } from '../../Employer-components/navbar'
import { FaCity, FaEdit, FaGift, FaMapMarkerAlt, FaMoneyBillWave, FaTrash } from 'react-icons/fa'
import EdiJobModal from './EdiJobModal'
import toast from 'react-hot-toast'
import { useJobContext} from '../EmployerContext/EmployerContext'


const JobPostDetails = () => {
  const {id}=useParams()
  const [jobDetails,setJobDetails]=useState([])
  const [showModal,setShowModal]=useState(false)
  const {deleteJob}=useJobContext()
  const navigate=useNavigate()
  
  const api_url = import.meta.env.VITE_EMPLOYER_URL;
  console.log(api_url);
  


  useEffect(()=>{
      const fetchJobDetails=async()=>{
        try{
          const response=await axios.get(`${ api_url}/jobPost/getJobId/${id}`)
          setJobDetails(response.data.data)
        }catch(error){
          console.error("fetching error",error.message);
          
        }
      }
      fetchJobDetails()
  },[])

  const handleInputChange=(e)=>{
    const {name,value}=e.target
    setJobDetails(prev=>({...prev,[name]:value}))
  }

  const handleUpdate=async()=>{
    try{
      await axios.put(`${api_url}/jobPost/editJobPost/${id}`,jobDetails)
      setShowModal(false)
      toast.success('Updated!')

    }catch(error){
      console.error("update failes",error.message);
      
    }
  }
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div>
    {/* <div> */}
       <EmployerNavbar/>
    {/* </div> */}
    {/* <div className='absolute top-0 left-0 ml-4 mt-4'> */}
    <button onClick={handleBack} className='text-black text-2xl absolute top-4 left-4 z-10 cursor-pointer  mt-44 ml-96  '>⇦</button>

    {/* </div> */}
    <div className="max-w-xl mx-auto mt-48 p-9 bg-white rounded-lg shadow-lg relative">
      {/* <div className='absolute top-3 right-3 flex gap-3 text-gray-500'> */}
      <div className='flex justify-end gap-2'>
      <FaEdit onClick={()=>setShowModal(true)} className="hover:text-blue-600 text-md text-gray-500" />  
      <FaTrash className="hover:text-red-600 text-sm text-gray-500" onClick={() => {
  if (confirm('Are you sure you want to delete this job?')) {
    deleteJob(jobDetails._id);
  }
}}/> 
      </div>
       {/* </div> */}
       <h1 className="text-3xl font-bold text-primary mt-4">{jobDetails.jobTitle}</h1>
        <h2 className="text-xl text-gray-800">{jobDetails.companyName}</h2>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600 flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <span className="font-medium">Location:</span> {jobDetails.jobs_location}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <FaMoneyBillWave className="mr-2" />
            <span className="font-medium">Salary:</span> ₹{jobDetails.minPay} - ₹{jobDetails.maxPay} {jobDetails.rate}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <FaCity className="mr-2" />
            <span className="font-medium">City:</span> {jobDetails.city}, {jobDetails.area}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <FaGift className="mr-2" />
            <span className="font-medium">Benefits:</span> {jobDetails.benefits}
          </p>
        </div>

      {showModal && (
        <EdiJobModal
        jobDetails={jobDetails}
        onClose={()=>setShowModal(false)}
        onChange={handleInputChange}
        onSubmit={handleUpdate}
        />
      )}
    </div>
    </div>
  )
}

export default JobPostDetails




