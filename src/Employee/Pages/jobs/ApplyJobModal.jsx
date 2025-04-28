import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserIcon, EnvelopeIcon, PhoneIcon, PaperClipIcon, BriefcaseIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'


const ApplyJobModal = ({ job, closeModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [resume, setResume] = useState(null);
  const [fresherOrExperienced, setFresherOrExperienced] = useState('');
  const [currentCTC, setCurrentCTC] = useState('');
  const [expectedCTC, setExpectedCTC] = useState('');
  const token = localStorage.getItem('accessToken');
  const apiUrl = import.meta.env.VITE_USER_URL;

  const handleApply = async () => {
    if (!name || !email || !phonenumber || !resume || !fresherOrExperienced || !expectedCTC) {
      toast.error('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phonenumber', phonenumber);
    formData.append('resume', resume);
    formData.append('fresherOrExperienced', fresherOrExperienced);
    formData.append('expectedCTC', expectedCTC);
    formData.append('jobId', job._id);
    if (fresherOrExperienced === "Experienced") {
      formData.append("currentCTC", currentCTC);
    }
    

    try {
      const response = await axios.post(`${apiUrl}/jobs/applyJob`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Application submitted successfully!');
      closeModal();
    } catch (error) {
      toast.error('Failed to apply for the job');
      console.error('Apply error:', error);
    }
  };

  return (
    
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-gray-600 text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Apply for {job.jobTitle}
        </h2>

        <div className="flex flex-col gap-3">
          {/* Full Name */}
          <div className="relative flex items-center">
            <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
            <input
              className="border p-2 rounded w-full"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="relative flex items-center">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
            <input
              className="border p-2 rounded w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="relative flex items-center">
            <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
            <input
              className="border p-2 rounded w-full"
              type="text"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </div>

          {/* Resume */}
          <div className="relative flex items-center">
            <PaperClipIcon className="h-5 w-5 text-gray-400 mr-3" />
            <input
              className="border p-2 rounded w-full"
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </div>

          {/* Experience Dropdown */}
          <div className="relative flex items-center">
            <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-3" />
            <select
              className="border p-2 rounded w-full"
              value={fresherOrExperienced}
              onChange={(e) => setFresherOrExperienced(e.target.value)}
            >
              <option value="">Select Experience</option>
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>

          {/* Current CTC (only for Experienced) */}
          {fresherOrExperienced === "Experienced" && (
            <div className="relative flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Current CTC"
                className="border p-2 rounded w-full"
                value={currentCTC}
                onChange={(e) => setCurrentCTC(e.target.value)}
              />
            </div>
          )}

          {/* Expected CTC */}
          <div className="relative flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-3" />
            <input
              className="border p-2 rounded w-full"
              type="text"
              placeholder="Expected CTC"
              value={expectedCTC}
              onChange={(e) => setExpectedCTC(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            className="bg-secondary text-white py-2 rounded hover:bg-accent mt-2"
            onClick={handleApply}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>      
     );
};

export default ApplyJobModal;
