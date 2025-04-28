import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";
import { GoogleLogin } from '@react-oauth/google';

// import { Button, GoogleSignUpButton } from "../../components/Buttons";

const apiUrl = import.meta.env.VITE_USER_URL;
const api_Url = import.meta.env.VITE_GOOGLE_URL;
console.log(apiUrl);



const EmployeeSignup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phonenumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Too short!")
        .max(15, "Too long!")
        .required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 8 characters")
        .required("Password is required"),
      phonenumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("values",values);
      
      try {
        const response = await axios.post(`${apiUrl}/register`, values);
        console.log("Signup successful", response.data);
        toast.success("Registered successfully!");
        resetForm();
        navigate("/employeeLogin");
      } catch (error) {
        console.error("Signup error", error.response?.data || error.message);
      }
    },
  });

  //=======================================================googlelogin========================================
  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse.credential);
  
    if (!credentialResponse.credential) {
      console.error("Google credential is missing");
      toast.error("Google Login Failed");
      return;
    }
  
    try {
      const res = await axios.post(`${api_Url}/auth/google`, {
        accessToken: credentialResponse.credential, 
      },{
        withCredentials: true
      });
  
      console.log("res", res.data);
      localStorage.setItem("accessToken", res.data.accessToken.accessToken);
      localStorage.setItem("isUser", "true");
      toast.success("Logged in successfully!");
      navigate('/')
    } catch (err) {
      console.error("Google login failed", err);
      toast.error("Google login failed.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-primary min-h-screen w-full mt-36">
        <div className="flex items-center gap-2  justify-center mr-64 mb-2">
          <img src={logo} alt="worknetlogo" className="w-10 mb-2" />
          <h1 className="text-2xl font-bold font-playfair mb-4 text-center text-secondary">
            Sign Up
          </h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col items-center">
            <div className="relative ">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-96 p-3 pl-10 rounded-3xl text-sm "
              />
            </div>
          </div>

          <div className="">
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-sm mt-1 flex justify-center mr-60">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-96 p-3 pl-10  rounded-3xl text-sm"
              />
            </div>
          </div>
          <div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1 flex justify-center mr-60">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col items-center">
            <div className="relative ">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-96 p-3 pl-10 rounded-3xl text-sm "
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-sm mt-1 flex justify-center mr-60">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col items-center ">
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="phonenumber"
                placeholder="Enter your mobile number"
                value={formik.values.phonenumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-96 p-3 pl-10  rounded-3xl text-sm"
              />
            </div>
            {formik.touched.phonenumber && formik.errors.phonenumber && (
              <p className="text-red-400 text-sm mt-1 flex justify-center mr-60">
                {formik.errors.phonenumber}
              </p>
            )}
          </div>
          <button type="submit" className="w-96 p-2 pl-1 mt-8 rounded-lg bg-secondary text-white block mx-auto" >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-1 ml-52 text-[11px]">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/employeeLogin")}
          >
            Log in
          </span>
        </p>

        <div className="text-center mt-2">
          <h1 className="mb-3 text-secondary text-[10px]">OR</h1>
        </div>
          {/* <GoogleSignUpButton text='Sign up with Google'/> */} 
          <div className="flex items-center justify-center gap-2 px-2 py-1 text-secondary  rounded-full transition">

                <GoogleLogin
                  className="google-login-button"
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}                  onSuccess={handleGoogleLogin}
                  //  prompt="select_account"
                    // ux_mode="popup"
                  onError={() => {
                    console.error("Google Login Failed");
                    toast.error("Google login failed");
                  }}
                />
              </div>
      </div>
    </div>

    // </div>
  );
};

export default EmployeeSignup;
