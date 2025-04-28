import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import React, { useState } from "react";
import Stepper from "./Stepper";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
const api_url = import.meta.env.VITE_EMPLOYER_URL;
console.log(api_url);

const AddJobModal = ({ onClose }) => {
  const userEmail = localStorage.getItem("employerEmail");
  const token = localStorage.getItem("accessToken");
  const [step, setStep] = useState(1);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [jobData, setJobData] = useState({
    company_email: "",
    jobTitle: "",
    companyName: "",
    fullName: "",
    phonenumber: "",
    // location: "",
    details: "",
    employmentType: "Full-time",
    // pay: "",
    benefits: "",
    rate: "",
    jobDescription: "",
    company_description: "",
    city: "",
    area: "",
    pincode: "",
    jobs_location: "on-site",
    minPay: "",
    maxPay: "",
    email: userEmail,
  });
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api_url}/jobPost/jobPost`, jobData, {
        headers: { "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
         },
      });
      toast.success("Job submitted successfully!");
      // onJobPosted();
      console.log("emplty responsedata", response.data);
      console.log("Job sumbitted", jobData);

      onClose();
    } catch (error) {
      console.error("Error submitting jobs", error);
      console.error(
        "Error submitting jobs",
        error.response ? error.response.data : error.messag
      );
      toast.error(" Error Job submitting");
    }
  };
  const toggleBenefit = (benefit) => {
    const updated = selectedBenefits.includes(benefit)
      ? selectedBenefits.filter((item) => item !== benefit)
      : [...selectedBenefits, benefit];

    setSelectedBenefits(updated);
    setJobData({ ...jobData, benefits: updated.join(", ") });
  };
  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-black bg-opacity-50 fixed inset-0"></div>

      <div className="bg-white pt-16 rounded-lg shadow-lg w-full max-w-5xl relative pb-10 pr-9 pl-9 ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <Stepper currentStep={step} className="mb-6" />

        {/* Stepper */}

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <>
            {/* <div className="grid grid-cols-2"> */}
            <div>
              {/* <label className='text-sm font-thin text-secondary'>Company Name</label> */}
              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={jobData.companyName}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-8 pl-5 "
                required
              />
              <input
                type="text"
                name="company_email"
                placeholder="Enter company Email"
                value={jobData.company_email}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-8 pl-5 "
                required
              />
            </div>
            <div>
              {/* <label className='text-sm font-thin text-secondary'>Company Name</label> */}
              <input
                type="text"
                name="email"
                placeholder={userEmail}
                value={jobData.email}
                // onChange={handleChange}
                className="w-full p-2 border rounded mt-8 pl-5 hover:cursor-not-allowed"
                required
                disabled
              />
            </div>
            <div>
              {/* <label>Full Name</label> */}
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                value={jobData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-8 pl-5 "
                required
              />
            </div>
            {/* </div> */}
            {/* <div className="mt-4"> */}
            {/* <label>Phone Number</label> */}
            <input
              type="number"
              name="phonenumber"
              placeholder="Phone number"
              value={jobData.phonenumber}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-8 pl-5"
              required
            />
            {/* </div> */}
            <div className="mt-4">
              <label className="text-sm ml-1 text-accent ">
                How did you hear about us?
              </label>
              <select
                name="details"
                onChange={handleChange}
                value={jobData.details}
                className="w-full p-2 border rounded mt-2 text-gray-400 text-sm  pl-5"
              >
                <option value="">Select an option</option>
                <option value="online_video">Online Video</option>
                <option value="social_media">Social Media</option>
                <option value="friends">Friends</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={nextStep}
                className="bg-secondary text-white px-6 py-2 rounded"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2: Employment Type */}
        {step === 2 && (
          <>
            <div className="mt-9 mb-6">
              <label className="text-accent text-sm ">
                Company Description
              </label>
              <br />
              <label className="text-[10px] text-gray-600">
                Indroduce your company to people in a few lines
              </label>
              <input
                type="text"
                name="company_description"
                value={jobData.company_description}
                onChange={handleChange}
                className="w-full p-2 border focus:ring focus:ring-accent rounded focus:border-transparent"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-accent text-sm">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                onChange={handleChange}
                value={jobData.jobTitle}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-accent text-sm ">
                Which option describe job's location
              </label>
              <select
                name="jobs_location"
                onChange={handleChange}
                value={jobData.jobs_location}
                className="w-full p-2 border rounded text-sm text-gray-500"
              >
                <option value="on-site" className="text-gray-600 text-[10px]">
                  on-site
                </option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-5">
              <div>
                <label className="block mb-1 text-sm text-accent">City</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={jobData.city}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-accent">Area</label>
                <input
                  type="text"
                  name="area"
                  onChange={handleChange}
                  value={jobData.area}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-accent">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  onChange={handleChange}
                  value={jobData.pincode}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="bg-secondary text-white px-6 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-secondary text-white px-6 py-2 rounded"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3: Pay and Benefits */}
        {step === 3 && (
          <>
            {/* <div className="max-w-3xl mx-auto p-8  rounded-lg shadow-md"> */}
            {/* Header */}

            {/* Pay Section */}
            <div className="mb-6 mt-16">
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <label className="block text-secondary font-medium">
                    Minimum
                  </label>
                  <input
                    type="text"
                    name="minPay"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                    placeholder="₹"
                    onChange={handleChange}
                    value={jobData.minPay}
                  />
                </div>
                <div>
                  <label className="block text-secondary font-medium">
                    Maximum
                  </label>
                  <input
                    type="text"
                    name="maxPay"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none text-accent"
                    placeholder="₹"
                    value={jobData.maxPay}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-secondary font-medium">
                    Rate
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none text-sm text-gray-400"
                    name="rate"
                    onChange={handleChange}
                    value={jobData.rate}
                  >
                    <option>Per month</option>
                    <option>Per month</option>
                    <option>Per hour</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Supplemental Pay Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-secondary">
                Supplemental Pay
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {[
                  "Performance Bonus",
                  "Yearly Bonus",
                  "Overtime Pay",
                  "Quarterly Pay",
                  "Others",
                ].map((pay, index) => (
                  <button
                    key={index}
                    // className="px-4 py-2 rounded-full bg-white  border border-gray-300 text-sm text-accent"
                    name="benefits"
                    className={`px-4 py-2 rounded-full border text-sm ${
                      selectedBenefits.includes(pay)
                        ? "bg-accent text-white border-accent"
                        : "bg-white text-accent border-gray-300"
                    }`}
                    onClick={() => toggleBenefit(pay)}
                    value={jobData.benefits}
                  >
                    +{pay}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-secondary text-white px-6 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-secondary text-white px-6 py-2 rounded"
              >
                Next
              </button>
            </div>
            {/* </div> */}
          </>
        )}

        {/* Step 4: Job Description */}
        {step === 4 && (
          <>
            <h2 className="text-lg font-semibold mb-4 mt-16 text-secondary">
              Job Description
            </h2>
            <textarea
              name="jobDescription"
              placeholder="Describe the job role"
              onChange={handleChange}
              className="w-full p-2 border rounded h-64 "
              value={jobData.jobDescription}
            ></textarea>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-secondary text-white px-6 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-secondary text-white px-6 py-2 rounded"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-secondary flex justify-center mt-12">
              Job Details
            </h2>
            <ul className="text-sm text-gray-700 ">
              {[
                { label: "Job Title", value: jobData.jobTitle },
                { label: "Company name", value: jobData.companyName },
                { label: "Employment Type", value: jobData.employmentType },
                { label: "Jobs Location", value: jobData.jobs_location },
                { label: "City", value: jobData.city },
                { label: "Area", value: jobData.area },
                { label: "Pincode", value: jobData.pincode },
                { label: "rate", value: jobData.rate },

                // { label: "Pay", value: `₹${jobData.pay}` },
                { label: "Benefits", value: jobData.benefits },
                { label: "Job Description", value: jobData.jobDescription },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2 border-b last:border-none"
                >
                  <span className="font-medium">{item.label}:</span>
                  <div className="flex items-center gap-2">
                    <span>{item.value}</span>
                    <button className="text-gray-500 hover:text-gray-700 transition">
                      <FaEdit />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-secondary text-white px-6 py-2 rounded"
              >
                Back
              </button>
              <button
                // onClick={nextStep}
                className="bg-secondary text-white px-6 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default AddJobModal;
