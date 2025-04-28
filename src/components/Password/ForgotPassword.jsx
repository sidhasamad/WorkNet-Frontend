import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_USER_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${apiUrl}/userforgotPassword`, {
        email,
      });
      navigate("/otpVerify");
      console.log("Otp send", response.data.message);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-sixth flex items-center justify-center mb-5">
          <span className="text-2xl text-accent">?</span>
        </div>
        <h2 className="text-lg font-semibold text-seven text-center mb-4 hover:text-accent">
          It's okay! Reset your password
        </h2>
      </div>

      <form className="mt-5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Email"
          className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-secondary text-white font-semibold py-2 rounded-md mt-4 hover:bg-seven transition"
          // onClick={()=>navigate('/resetPassword')}
        >
          Continue
        </button>
      </form>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
