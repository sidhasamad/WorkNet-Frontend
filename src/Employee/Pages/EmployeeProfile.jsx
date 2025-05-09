
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navbar } from "./navbar";
import { useNavigate } from "react-router-dom";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState([]);
  const [appliedJobCount, setAppliedJobCount] = useState(0);
  console.log("employee", employee);

  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    linkedIn: "",
    github: "",
  });
  const navigate=useNavigate()
  const fileInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const apiUrl = import.meta.env.VITE_USER_URL;
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");
  console.log("token", token);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/employeeProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data.data;
        setEmployee(userData);

        setEditUser({
          name: response.data.data.name,
          email: response.data.data.googleId || response.data.data.email || "",
          phoneNumber: response.data.data.phoneNumber || "",
          linkedIn: response.data.data.linkedIn || "",
          github: response.data.data.github || "",
        });
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/updateEmployeeProfile`,
        editUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setEmployee((prev) => ({ ...prev, ...editUser }));
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      uploadProfilePicture(file);
    }
  };
  const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post(`${apiUrl}/uploadProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setEmployee((prevUser) => ({
          ...prevUser,
          images: response.data.data.images,
        }));
        toast.success("Profile picture uploaded successfully!");
        setProfilePicture(null);
      } else {
        toast.error(
          response.data.message || "Failed to upload profile picture"
        );
      }
    } catch (error) {
      console.error(
        "Error uploading profile picture:",
        error.response?.data?.message || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to upload profile picture"
      );
    }
  };
  const handleProfilePictureButtonClick = () => {
    fileInputRef.current.click();
  };

  // const handleResetPassword = () => {
  //   navigate("/reset-password");
  // };

  const handleSavedJobs = () => {
    navigate("/employeeSavedJob");
  };

  const handleAppliedJobs = () => {
    navigate("/appliedJobs");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/main");
    setEmployee(null);
    toast("You've been logged out!");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-20 flex flex-col md:flex-row gap-10">
        {/* Profile Section */}
        <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            {employee.images ? (
              <img
                src={employee.images}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-400 rounded-full flex items-center justify-center text-black text-4xl">
                {employee.name ? employee.name[0] : "U"}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
              ref={fileInputRef}
            />
            <button
              onClick={handleProfilePictureButtonClick}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white"
            >
              +
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            {employee?.googleId?.employee?.name ||
              employee?.name ||
              "Unknown User"}
          </h2>
          <p className="text-gray-600">
            {employee.googleId || employee.email || "No email"}
          </p>

          <div className="flex flex-col mt-6 w-full gap-3">
            <button
              onClick={handleSavedJobs}
              className="w-full text-center py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              Saved Jobs
            </button>
            <button
              onClick={handleAppliedJobs}
              className="w-full text-center py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              View Applied Jobs
            </button>
            {/* <button
              onClick={handleResetPassword}
              className="w-full text-center py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              Reset Password
            </button> */}
            <button
              onClick={handleLogout}
              className="w-full text-center py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="w-full md:w-2/3 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Basic Info</h3>
            <button
              onClick={handleUpdateProfile}
              className="bg-accent text-white font-semibold py-2 px-6 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              Save
            </button>
          </div>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={editUser.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={editUser.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label
                htmlFor="linkedIn"
                className="block text-sm font-medium text-gray-700"
              >
                LinkedIn link
              </label>
              <input
                type="text"
                name="linkedIn"
                id="linkedIn"
                value={editUser.linkedIn}
                onChange={handleInputChange}
                placeholder="Enter your LinkedIn profile"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-3 text-blue-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            {/* GitHub */}
            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700"
              >
                GitHub link
              </label>
              <input
                type="text"
                name="github"
                id="github"
                value={editUser.github}
                onChange={handleInputChange}
                placeholder="Enter your GitHub profile"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-3 text-blue-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            {/* Update Button */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
