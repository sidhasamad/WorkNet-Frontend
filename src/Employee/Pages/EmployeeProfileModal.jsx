
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployeeProfileModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("accessToken") || localStorage.getItem('token');
  console.log("accessTokenn", token);

  const apiUrl = import.meta.env.VITE_USER_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (showModal) {
          const response = await axios.get(`${apiUrl}/employeeProfile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("API response", response.data);
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("profile fetching error", error);
      }
    };
    fetchProfile();
  }, [showModal]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      toast.error("Please select a file to upload!");
      return;
    }

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
        setUser((prevUser) => ({
          ...prevUser,
          images: response.data.data.images,
        }));
        toast.success("Profile picture uploaded successfully!");
        setSelectedFile(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload profile picture.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken") || localStorage.removeItem('token');
    navigate("/main");
    setShowModal(false);
    setConfirmLogout(false);
    toast("You've been logged out!");
  };

  return (
    <div className="relative">
      {/* <FaUser
        className="text-xl cursor-pointer text-secondary mr-10"
        onClick={() => setShowModal(true)}
      /> */}

{user?.images ? (
        <img
          src={user.images}
          alt="Profile"
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
              <div className="flex items-center relative">
                <div className="relative">
                  {user?.images ? (
                    <img
                      src={user.images}
                      alt="profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-[60px] h-[60px] bg-gray-400 rounded-full flex items-center justify-center text-white text-2xl">
                      {user?.name[0]}
                    </div>
                  )}
                  <button
                    onClick={() => document.getElementById("fileInput").click()}
                    className="absolute top-0 right-0 bg-gray-400 text-white pb-1 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/jpg"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <h2 className="font-bold text-md text-black mt-1">
                    {user?.googleId ? user?.name : user?.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {user?.googleId ? user?.googleId : user?.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    navigate("/employeeprofile");
                    setShowModal(false);
                  }}
                  className="mt-2 bg-secondary text-white w-[100px] rounded-md"
                >
                  Profile
                </button>

                <button
                  onClick={() => setConfirmLogout(true)}
                  className="mt-2 bg-red-500 text-white w-[100px] rounded-md p-2"
                >
                  Sign Out
                </button>
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
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeProfileModal;
