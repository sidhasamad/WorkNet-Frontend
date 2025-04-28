import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBuilding,
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faLock,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {  GoogleSignUpButton } from "../../components/Buttons";
import logoImage from "../../assets/logo/logo.png";

const api_url = import.meta.env.VITE_EMPLOYER_URL;
console.log(api_url);

const EmployerSignup = () => {
  // const [Logo, setLogo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      companyName: "",
      location: "",
      email: "",
      phone: "",
      password: "",
      Logo:null
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      companyName: Yup.string().required("Company name is required"),
      location: Yup.string().required("Location is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be a 10-digit number")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
        Logo: Yup.mixed().required("Logo is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("companyName", values.companyName);
      formData.append("location", values.location);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("Logo", values.Logo);
      console.log("formdata", formData);

      // if (Logo) {
      //   formData.append("file", Logo);
      // }
      try {
        const response = await axios.post(
          `${api_url}/employerRegister`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("res:", response.data);
        navigate("/employerLogin");
        toast.success("Registered successfully!");
      } catch (error) {
        console.error("error:", error.response?.data?.message || error.message);
        setErrorMessage(error.response?.data?.message || "Registration failed");
        alert(error.response?.data?.message || "Registration failed ❌");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-primary min-h-screen w-full mt-24">
        <div className="flex items-center gap-2  justify-center mr-52 mb-2">
          <img src={logoImage} alt="WorkNet Logo" className="w-10 mb-2" />
          <h1 className="text-2xl font-bold font-playfair mb-4 text-center text-secondary">
            Start Hiring
          </h1>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          {/* Name Input */}
          {/* =====================from here==================== */}
          <div className="flex flex-col items-center">
            <div className="relative ">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-96 p-3 pl-10 rounded-3xl text-sm"
                {...formik.getFieldProps("name")}
              />
            </div>
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-400 text-sm mt-1 flex justify-center mr-60">
              {formik.errors.name}
            </p>
          )}
          {/* =================To here======================= */}

          {/* Company Name Input */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <FontAwesomeIcon
                icon={faBuilding}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="w-96 p-3 pl-10 rounded-3xl text-sm"
                {...formik.getFieldProps("companyName")}
              />
            </div>
          </div>
          {formik.touched.companyName && formik.errors.companyName && (
            <p className="text-red-400 text-sm mt-1 flex justify-center mr-48">
              {formik.errors.companyName}
            </p>
          )}

          {/* Location Input */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-96 p-3 pl-10 rounded-3xl text-sm"
                {...formik.getFieldProps("location")}
              />
            </div>
          </div>
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-400 text-sm mt-1 flex justify-center mr-60">
              {formik.errors.location}
            </p>
          )}

          {/* Email Input */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-96 p-3 pl-10 rounded-3xl text-sm"
                {...formik.getFieldProps("email")}
              />
            </div>
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-sm mt-1 flex justify-center mr-64">
              {formik.errors.email}
            </p>
          )}

          {/* Phone Input */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-96 p-3 pl-10 rounded-3xl text-sm"
                {...formik.getFieldProps("phone")}
              />
            </div>
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-400 text-sm mt-1 flex justify-center mr-48">
              {formik.errors.phone}
            </p>
          )}

          {/* Password Input */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-96 p-3 pl-10 rounded-3xl text-sm"
                {...formik.getFieldProps("password")}
              />
            </div>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-sm mt-1 flex justify-center mr-60">
              {formik.errors.password}
            </p>
          )}

          {/* File Input for Company Logo */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <FontAwesomeIcon
                icon={faUpload}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
        <input
          type="file"
          name="Logo"
          accept="image/*"
          onChange={(event) =>{
            formik.setFieldValue("Logo", event.currentTarget.files[0])
          }}
        />
        </div>
        </div>
        {formik.touched.Logo && formik.errors.Logo && <p>{formik.errors.Logo}</p>}
        <div>

      
          </div>
          {/* <Button text="Signup" size="large" navigateTo={"/employerLogin"} /> */}
          <button
            type="submit"
            className="w-96 p-2 pl-1 mt-8 rounded-lg bg-secondary text-white block mx-auto"
            // label="Register"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-1 ml-52 text-[11px]">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/employerLogin")}
          >
            Log in
          </span>
        </p>
        <div className="text-center mt-2">
          <h1 className="mb-3 text-secondary text-[10px]">OR</h1>
        </div>
        <GoogleSignUpButton text="Sign up with Google" />
      </div>
    </div>
  );
};

export default EmployerSignup;
