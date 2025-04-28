import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope } from "react-icons/fa";
const api_url = import.meta.env.VITE_EMPLOYER_URL;
import logo from "../../assets/logo/logo.png";
import { Button, GoogleSignUpButton } from "../../components/Buttons";
// import { Button, GoogleSignUpButton } from "../Employee-components/Buttons";

const EmployerLogin = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false); // Track login box visibility

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${api_url}/employerLogin`, values, {
          withCredentials: true,
        });
        console.log("Login Success:", response.data);
        // console.log("Login Success:eemail", response.data.data.email);
        localStorage.setItem("employerEmail", response.data.data.email)
        localStorage.setItem("accessToken", response.data.accessToken);
        toast.success("Login Successful!");
        navigate("/employer-homePage");
      } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || "Login failed. Try again!");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-danger">
      <motion.div
        className="bg-danger text-white p-10 rounded-lg shadow-2xl w-96 text-center relative hover:bg-sixth"
        initial={{ scale: 1 }}
        animate={{ scale: showLogin ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <img src={logo} alt="worknetlogo" className="w-16" />
        </div>

        {/* Login Button */}
        {!showLogin && (
          <motion.button
            className="text-white font-bold text-lg flex items-center justify-center gap-2 bg-gray-700 p-3 w-full rounded-lg shadow-md hover:bg-gray-600"
            onClick={() => setShowLogin(true)}
            whileTap={{ scale: 0.95 }}
          >
             LOGIN 
          </motion.button>
        )}

        {/* Login Form - Appears When Button Clicked */}
        {showLogin && (
          <motion.form
            onSubmit={formik.handleSubmit}
            className="space-y-6  mt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Email Field */}
            <div className="flex flex-col items-center">
              <div className="relative w-full">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 pl-10 rounded-3xl bg-gray-800 text-white outline-none"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-gray-400 text-sm mt-1 mr-40">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col items-center">
              <div className="relative w-full">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 pl-10 rounded-3xl bg-gray-800 text-white outline-none"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-gray-400 text-sm mt-1 mr-40">{formik.errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <Button text="Login" size="medium" />

            {/* Sign Up Link */}
            <div className="flex justify-between items-center w-full text-gray-600 text-sm mt-4">
              <p className="cursor-pointer hover:text-blue-500 transition text-[10px] ml-2"
              onClick={()=>navigate('/forgotPassword')}
              >Forgot Password?</p>
              
            <p className="text-center text-[10px] ">
              Don't have an account?{" "}
              <span
                className="text-blue-500 font-semibold cursor-pointer hover:underline transition"
                onClick={() => navigate("/employerRegister")}
              >
                Sign Up
              </span>
            </p>
            </div>

            {/* Google Sign-In */}
            <div className="text-center mt-2">
              <h1 className="mb-3 text-gray-400 text-sm">OR</h1>
              <GoogleSignUpButton text="Sign in with Google" />
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default EmployerLogin;
