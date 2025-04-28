import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useEmployeeContext } from './AdminEmployeeContext/AdminEmployeeContext';
import toast from 'react-hot-toast';

const TotalEmployee = () => {
  const [totalEmployee,setTotalEmployee]=useState([])
  const { deleteEmployee } = useEmployeeContext();

  const apiUrl = import.meta.env.VITE_ADMIN_URL;
  const navigate=useNavigate()
  const handleNavigate = (id) => {
    console.log("idd",id);
    
    navigate(`/admin/totalEmployeeId/${id}`)
  }
  
 
  useEffect(()=>{
    axios.get(`${apiUrl}/totalemployeeslist`)
    .then((res)=>{
      const filteredEmployee=res.data.data.filter((u)=>!u.email.startswith('worknet'))
      console.log("employees",filteredEmployee);
      setTotalEmployee(filteredEmployee)
      
    })
    .catch((error)=>{
      console.error("employee fetching error",error);
      
    })
  },[])
  const handleDelete = async (id) => {
  
    const result = await deleteEmployee(id);
    if (result.success) {
      setTotalEmployee(prev => prev.filter(emp => emp._id !== id));
      toast("Employee deleted successfully!");
    } else {
      alert("Failed to delete employee: " + result.message);
    }
  };
  const handleEdit = (id) => {
    console.log("edit id", id);
    // Navigate to edit page or open modal
  };

  return (
    <div className="p-4">
    <h2 className="text-md font-bold mb-10 text-secondary ">Total Employees</h2>
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Email</th>
          <th className="border px-4 py-2 text-left">Phone Number</th>
          <th className="border px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {totalEmployee.map((employee, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{employee.name}</td>
            <td className="border px-4 py-2">{employee.email}</td>
            <td className="border px-4 py-2">{employee.phonenumber}</td>
             {/* <td className="border px-4 py-2"> */}
            <td className="border px-4 py-2 flex gap-2"> 
            {/* </td> */}
  <button
    className=" text-accent p-1 rounded ml-3  "
    onClick={() => handleNavigate(employee._id)}
    title="View"
  >
    <FiEye/>
  </button>
  <button
    className=" text-secondary p-2 rounded"
    onClick={() => handleEdit(employee._id)}
    title="Edit"
  >
    <FiEdit/>
  </button>
  <button
    className=" text-red-600 p-2 rounded"
    onClick={() => handleDelete(employee._id)}
    title="Delete"
  >
    <FiTrash2/>
  </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default TotalEmployee
