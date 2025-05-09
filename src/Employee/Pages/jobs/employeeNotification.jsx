
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navbar } from '../navbar';

const EmployeeNotifications = () => {
  const api_url = import.meta.env.VITE_USER_URL;
  const [notifications, setNotifications] = useState([]);
  console.log("notification",notifications);
  
  const [error, setError] = useState('');
  const token = localStorage.getItem('token') || localStorage.getItem('accessToken');


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!token) {
          throw new Error('Authentication token missing');
        }

        const response = await axios.get(`${api_url}/getnotifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotifications(response.data);
        setError('');
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch notifications';
        console.error('Fetch notifications error:', {
          status: error.response?.status,
          message: error.response?.data?.message,
          error: error.message,
          stack: error.stack,
        });
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        setError(errorMsg);
        toast.error(errorMsg);
      }
    };

    fetchNotifications();
  }, [api_url]);


  // const handleJobDetails = (jobDetails) => {
  //   if (jobDetails && typeof jobDetails === 'object') {
  //     if (jobDetails instanceof ArrayBuffer) {
  //       // If it's a binary ArrayBuffer, decode it into a string
  //       return new TextDecoder().decode(new Uint8Array(jobDetails));
  //     }
  //     // If it's an object, you can stringify it (only if needed)
  //     return JSON.stringify(jobDetails);
  //   }
  //   return jobDetails || 'N/A'; // Fallback to 'N/A' if jobDetails is falsy
  // };

  return (
    <div className="w-11/12 mx-auto px-6 py-10">
      <Navbar />
      <h2 className="text-2xl font-bold mb-6 text-center text-accent mt-16">
        Your Notifications
      </h2>

      {error && (
        <p className="text-red-600 text-center text-sm font-medium mb-4">{error}</p>
      )}

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 rounded-lg shadow-md ${
                notification.status === 'Approved'
                  ? 'bg-green-100 '
                  : 'bg-red-100 '
              }`}
            >
              <p className="text-sm text-gray-600">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
              <p className="text-lg text-secondary font-bold">
                {notification.jobDetails}
              </p>
              <p>{notification.companyName}</p>
              <p className="text-lg font-semibold">{notification.message}</p>
              <p
  className={`text-[20px] text-white px-0 py-1 rounded inline-block ${
    notification.status === "Approved" ? "text-green-500" : "text-red-500"
  }`}
>
  Status: {notification.status}
</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeNotifications;