import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

const TotalEmployer = () => {
  const [totalEmployer,setTotalEmployer]=useState([])
  console.log("employer",totalEmployer);
  
  const apiUrl = import.meta.env.VITE_ADMIN_URL;

  useEffect(()=>{
    axios.get(`${apiUrl}/totalemployerslist`)
    .then((res)=>{
      setTotalEmployer(res.data.data)
    })
    .catch((error)=>{
      console.error("employer fetched error",error);
      
    })
  },[])
  
  return (
<div className="p-4">
  <h2 className="text-md font-bold mb-10 text-secondary">Total Employees</h2>
  <table className="min-w-full border border-gray-300">
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-4 py-2 text-left">Logo</th>
        <th className="border px-4 py-2 text-left">Company Name</th>
        <th className="border px-4 py-2 text-left">Email</th>
        <th className="border px-4 py-2 text-left">Phone number</th>
        <th className="border px-4 py-2 text-left">Location</th>
        <th className="border px-4 py-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {totalEmployer.map((employer, index) => (
        <tr key={index} className="hover:bg-gray-50">
           <td className="border px-4 py-2">
            <img
              src={employer.Logo}
              alt={`${employer.companyName} logo`}
              className="w-10 h-10 object-contain"
            />
          </td>
          <td className="border px-4 py-2">{employer.companyName}</td>
          <td className="border px-4 py-2">{employer.email}</td>
          <td className="border px-4 py-2">{employer.phone}</td>
          <td className="border px-4 py-2">{employer.location}</td>
         
          <td className="border px-4 py-2 flex gap-2">
            <button className="text-accent p-1 rounded ml-3" title="View">
              <FiEye />
            </button>
            <button className="text-secondary p-2 rounded" title="Edit">
              <FiEdit />
            </button>
            <button className="text-red-600 p-2 rounded" title="Delete">
              <FiTrash2 />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    
  )
}

export default TotalEmployer
