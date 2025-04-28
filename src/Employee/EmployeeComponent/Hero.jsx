import React from "react";
import logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#dbe2fb]">
      <div className="text-center">
        <div className="mb-10 flex items-center justify-center gap-3">
          <img src={logo} alt="WorkNet Logo" className="w-16" />
          <h1 className="text-4xl font-Playfair text-[#1d2d75]">WorkNet</h1>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button 
          className="bg-gray-200 text-[#1d2d75] px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all"
          onClick={()=>navigate('/employerRegister')}
          >
            REGISTER AS EMPLOYER
          </button>
          <button
            className="bg-gray-200 text-[#1d2d75] px-6 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all"
            onClick={() => navigate("/employeeSignup")}
          >
            REGISTER AS EMPLOYEE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
