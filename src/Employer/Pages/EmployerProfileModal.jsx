import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmployerProfileModal = () => {
  const [showModal,setShowModal]=useState(false)
  const [employer,setEmployer]=useState([]);
  console.log("modalemployer",employer);
  
  const [confirmLogout,setConfirmLogout]=useState(false);
  const [selectedFile,setSelectedFile]=useState(null)
  const token=localStorage.getItem('accessToken')||localStorage.getItem('token')
  const email = localStorage.getItem('employerEmail');
  const apiUrl=import.meta.env.VITE_EMPLOYER_URL;
  console.log("hgh",apiUrl);
  
  const navigate=useNavigate()
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (showModal && token && email) {
          const response = await axios.get(`${apiUrl}/employerProfile/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEmployer(response.data);
        }
      } catch (error) {
        console.error('Profile fetching error:', error);
        toast.error('Failed to load employer profile');
      }
    };

    fetchProfile();
  }, [showModal, token, email, apiUrl]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/main');
    setShowModal(false);
    setConfirmLogout(false);
    toast.success("You've been logged out");
  };
  return (
    <div className="relative">
      {employer?.Logo ? (
        <img
          src={employer.Logo}
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover cursor-pointer mr-10"
          onClick={() => setShowModal(true)}
        />
      ) : (
        <FaUser
          className="text-xl cursor-pointer text-secondary mr-10"
          onClick={() => setShowModal(true)}
        />
      )}

      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="fixed top-20 right-10 bg-gray-300 p-6 rounded-lg shadow-lg z-50 w-80">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center">
                {employer?.Logo ? (
                  <img
                    src={employer.Logo}
                    alt="Company Logo"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[60px] h-[60px] bg-gray-400 rounded-full flex items-center justify-center text-white text-2xl">
                    {employer?.companyName?.[0] || "C"}
                  </div>
                )}
                <div className="flex flex-col ml-4">
                  <h2 className="font-bold text-md text-black mt-1">
                    {employer?.companyName}
                  </h2>
                  <p className="text-gray-600 text-sm">{employer?.email}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    navigate("/employerprofile");
                    setShowModal(false);
                  }}
                  className="bg-secondary text-white w-[100px] rounded-md py-2"
                >
                  Profile
                </button>

                <button
                  onClick={() => setConfirmLogout(true)}
                  className="bg-red-500 text-white w-[100px] rounded-md py-2"
                >
                  Sign Out
                </button>
              </div>

              {confirmLogout && (
                <>
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4 text-black">
                      Do you want to log out?
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmLogout(false)}
                        className="bg-gray-300 text-black px-4 py-2 rounded-md"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );}

export default EmployerProfileModal
