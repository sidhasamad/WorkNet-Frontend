import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const apiUrl = import.meta.env.VITE_USER_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be atleast 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password do not match");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/resetPassword`, {
        email: localStorage.getItem("resentEmail"),
        newPassword,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-secondary">
      <h2 className="text-lg font-semibold text-center mb-4 animate-pulse-text">
        Change your Password
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="relative w-64">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-64 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-seven mb-2"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="relative w-64">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-64 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-seven mb-2"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {confirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-secondary text-white font-semibold py-2 rounded-md mt-4 hover:bg-green-700 transition"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="text-green-600 mt-2 text-center">{message}</p>}
    </div>
  );
};

export default ResetPassword;
