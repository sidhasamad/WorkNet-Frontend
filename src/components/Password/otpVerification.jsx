

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const OtpVerification = () => {
  const [otpLength, setOtpLength] = useState(6);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const apiUrl = import.meta.env.VITE_USER_URL;
  const navigate = useNavigate();

  const text = "Enter the OTP sent to your Email".split(" ");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    const storedOtpLength = Number(localStorage.getItem("otpLength")) || 6;

    if (storedEmail) setEmail(storedEmail);
    setOtpLength(storedOtpLength);
  }, []);

  useEffect(() => {
    setOtp(Array(otpLength).fill(""));
  }, [otpLength]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otpLength - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (otp.some((digit) => digit === "")) {
      setError(`Please enter all ${otpLength} digits`);
      return;
    }

    const otpCode = otp.join("");

    try {
      const response = await axios.post(`${apiUrl}/resetPassword`, {
        email,
        otp: otpCode,
      });

      setMessage(response.data.message);
      console.log("OTP Verified:", response.data.message);
      navigate('/resetPassword');
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <h2 className="text-lg font-semibold text-center mb-4 text-accent flex flex-wrap">
        {text.map((word, wordIndex) => (
          <span key={wordIndex} className="mr-2 hover:text-blue-800">
            {word.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (wordIndex * 5 + index) * 0.1,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-10 h-10 text-center border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
              maxLength="1"
            />
          ))}
        </div>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-secondary text-white font-semibold py-2 rounded-md mt-4 hover:bg-seven transition"
        >
          Verify OTP
        </button>
      </form>

      {message && <p className="text-green-600 mt-2 text-center">{message}</p>}
    </div>
  );
};

export default OtpVerification;
