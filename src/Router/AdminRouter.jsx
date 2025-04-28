import React from "react"
import { Routes, Route } from "react-router-dom";
import AdminMain from "../Admin/AdminComponents/AdminMain";
import Dashboard from "../Admin/AdminComponents/Dashboard";
import TotalEmployee from "../Admin/Pages/AdminEmployee/TotalEmployee";
import EmployeeDetails from "../Admin/Pages/AdminEmployee/EmployeeDetails";
import TotalEmployer from "../Admin/Pages/AdminEmployer/TotalEmployer";

const AdminRouter=()=>{
  return(
    <div>
      <Routes>
         <Route path="/admin" element={<AdminMain/>}>
         <Route index element={<Dashboard/>}/>
         <Route path="totalEmployee" element={<TotalEmployee/>}/>
         <Route path="totalEmployeeId/:id" element={<EmployeeDetails/>}/>
         <Route path="totalEmployer" element={<TotalEmployer/>}/>
         </Route>
      </Routes>
    </div>
  )
}
export default AdminRouter