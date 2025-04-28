import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const [employeeDetails,setEmployeeDetails]=useState([])
  const apiUrl = import.meta.env.VITE_ADMIN_URL;
  const {id}=useParams()
  
  useEffect(()=>{
    axios.get(`${apiUrl}/getEmployeeId/${id}`)
    .then((res)=>{
      setEmployeeDetails(res.data.data)
         
    })
  })
  return (
    <div>
      <h1>jdgfjd</h1>
    </div>
  )
}

export default EmployeeDetails



