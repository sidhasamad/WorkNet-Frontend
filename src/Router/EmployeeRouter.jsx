import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeSignup from "../Employee/Pages/EmployeeSignup";
import EmployeeLogin from "../Employee/Pages/EmployeeLogin";
import Hero from "../Employee/EmployeeComponent/Hero";
import HomePage from "../Employee/EmployeeComponent/HomePage";
import GetJob from "../Employee/Pages/jobs/getJob";
import GetJobDetails from "../Employee/Pages/jobs/getJobDetails";
import { JobSeekerProvider } from "../Employee/EmployeeContext/EmployeeContext";
import EmployeeProfileModal from "../Employee/Pages/EmployeeProfileModal";
import EmployeeProfile from "../Employee/Pages/EmployeeProfile";
import SavedJob from "../Employee/Pages/jobs/savedJob";
import EmployeeAbout from "../Employee/Pages/EmployeeAbout";
import EmployeeContact from "../Employee/Pages/EmployeeContact";
// import ForgotPassword from '../components/Password/ForgotPassword';

const UserRouter = () => {
  return (
    <div>
      <JobSeekerProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<Hero />} />
          <Route path="/employeeSignup" element={<EmployeeSignup />} />
          <Route path="/employeeLogin" element={<EmployeeLogin />} />
          <Route path="/jobs-employee" element={<GetJob />} />
          <Route path="/jobs-employeeDetails/:id" element={<GetJobDetails />} />
          <Route
            path="/employeeprofileModal"
            element={<EmployeeProfileModal />}
          />
          <Route path="/employeeprofile" element={<EmployeeProfile />} />
          <Route path="/employeeSavedJob" element={<SavedJob />} />
          <Route path="/employeeAbout" element={<EmployeeAbout />} />
          <Route path="/employeeContact" element={<EmployeeContact />} />
          {/* <Route path='/forgotPassword' element={<ForgotPassword/>}/>  */}

          {/* <Route path="/aboutcontact" element={<Login />} />
        <Route path="/userlogin" element={<Login />} />  */}
        </Routes>
      </JobSeekerProvider>
    </div>
  );
};

export default UserRouter;
