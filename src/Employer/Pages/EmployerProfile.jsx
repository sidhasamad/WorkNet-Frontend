
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon, ArrowRightOnRectangleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { EmployerNavbar } from "../Employer-components/navbar";

const EmployerProfile = () => {
  const [employer, setEmployer] = useState([]);
  console.log("employer",employer);
  
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    Logo: "",
    location: "",
    email: "",
    phone: "",
  });
  console.log("formdata",formData);
  
  const apiUrl = import.meta.env.VITE_EMPLOYER_URL;
  const employerEmail = localStorage.getItem("employerEmail");

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
        const res = await axios.get(
          `${apiUrl}/employerProfile/${employerEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployer(res.data);
        setFormData({
          name: res.data.name,
          companyName: res.data.companyName,
          Logo: res.data.Logo,
          location: res.data.location,
          email: res.data.email,
          phone: res.data.phone,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    };

    if (employerEmail) {
      fetchEmployer();
    }
  }, [employerEmail]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("employerEmail");
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      const res = await axios.put(
        `${apiUrl}/updateEmployerProfile/${employerEmail}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployer(res.data);
      setIsModalOpen(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  if (error && !isModalOpen) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-red-600 text-lg font-medium bg-white p-4 rounded-lg shadow">{error}</p>
    </div>
  );
  if (!employer) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex ">
      <EmployerNavbar/>
      {/* Main Content */}
      <div className="flex-1 p-10 mt-16">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex items-center space-x-6 border-b border-gray-200 pb-6">
            <img
              src={employer.Logo}
              alt="Company Logo"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{employer.name}</h2>
              <p className="text-md font-medium text-gray-600">{employer.companyName}</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</h3>
              <p className="mt-1 text-gray-800 font-medium">{employer.email}</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</h3>
              <p className="mt-1 text-gray-800 font-medium">{employer.phone}</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</h3>
              <p className="mt-1 text-gray-800 font-medium">{employer.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for Actions */}
      <div className="w-72 bg-white border-l border-gray-200 p-6 flex flex-col justify-between mt-20">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Actions</h3>
          <button
            onClick={handleEdit}
            className="flex items-center space-x-3 w-full px-4 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg text-white transition duration-200 text-sm font-medium"
          >
            <PencilIcon className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition duration-200 text-sm font-medium"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
              <button onClick={closeModal}>
                <XMarkIcon className="w-6 h-6 text-red-600 hover:text-gray-800" />
              </button>
            </div>
            {error && (
              <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                  <input
                    type="text"
                    name="Logo"
                    value={formData.Logo}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerProfile;



