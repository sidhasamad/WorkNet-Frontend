import React from 'react'
import { Routes, Route } from "react-router-dom";
import EmployerSignup from '../Employer/Pages/EmployerSignup';
import EmployerLogin from '../Employer/Pages/EmployerLogin';
import { EmployerNavbar } from '../Employer/Employer-components/navbar';
import EmployerHome from '../Employer/Employer-components/HomePage';
import ForgotPassword from '../components/Password/ForgotPassword';
import OtpVerification from '../components/Password/otpVerification';
import ResetPassword from '../components/Password/resetPassword';
import JobPost from '../Employer/Pages/Jobs/JobPost';
import JobPostDetails from '../Employer/Pages/Jobs/JobPostDetails';
import { JobProvider } from '../Employer/Pages/EmployerContext/EmployerContext';
import GetApplicants from '../Employer/Pages/Jobs/Applicants';
import EmployerProfileModal from '../Employer/Pages/EmployerProfileModal';
import EmployerProfile from '../Employer/Pages/EmployerProfile';
// import EdiJobModal from '../Employer/Pages/Jobs/EdiJobModal';
// import EmployerForgotPassword from '../Employer/Pages/ForgotPassword';
const EmployerRouter = () => {
  return (
    <div>
        <JobProvider>
      <Routes>
        <Route path='/employerRegister' element={<EmployerSignup/>}/>
        <Route path='/employerLogin' element={<EmployerLogin/>}/>
        <Route path='/employer-navbar' element={<EmployerNavbar/>}/>
        <Route path='/employer-homePage' element={<EmployerHome/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/> 
        <Route path='/otpVerify' element={<OtpVerification/>}/> 
        <Route path='/resetPassword' element={<ResetPassword/>}/> 
        <Route path='/profileModal' element={<EmployerProfileModal/>}/> 

        {/* <Route path='/employer-ForgotPassword' element={<EmployerForgotPassword/>}/> */}
        <Route path='/jobPost' element={<JobPost/>}/>
        <Route path='/jobPost/:id' element={<JobPostDetails/>}/>
        <Route path='/applicants/:jobId' element={<GetApplicants/>}/>
        <Route path='/employerProfile'  element={<EmployerProfile/>}/>
        {/* <Route path='/EdiJobModal/:id' element={<EdiJobModal/>}/> */}
      </Routes>
        </JobProvider>
    </div>
  )
}

export default EmployerRouter