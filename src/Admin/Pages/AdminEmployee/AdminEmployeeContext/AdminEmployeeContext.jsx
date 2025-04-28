import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};

export const EmployeeProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const apiUrl = import.meta.env.VITE_ADMIN_URL;


  // Fetch users (admin side)
  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/totalemployees`);  // Make sure your API for getting users is set up
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Delete employee (admin action)
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/employeeDelete/${id}`);
      if (response.data.success) {
        setUsers(users.filter(user => user._id !== id)); 
        return response.data;  
      } else {
        return response.data; 
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, message: 'Error deleting user' };
    }
  };

  return (
    <EmployeeContext.Provider value={{ users, getUsers, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

