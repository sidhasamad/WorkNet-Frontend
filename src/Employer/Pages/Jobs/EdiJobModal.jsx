import React from "react";
import { useNavigate } from "react-router-dom";

const EdiJobModal = ({ jobDetails, onChange, onClose, onSubmit }) => {
  const navigate=useNavigate()
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-xl">
        <h1 onClick={()=>navigate(-1)}><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg></h1>
        <h2 className="text-xl font-semibold mb-4 mt-8">Edit Job Post</h2>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="jobTitle"
          value={jobDetails.jobTitle}
          onChange={onChange}
          placeholder="Job Title"
        />
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="companyName"
          value={jobDetails.companyName}
          onChange={onChange}
        />
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="jobs_location"
          value={jobDetails.jobs_location}
          onChange={onChange}
        />
      <input
  className="border p-2 mb-2 w-full"
  type="number"
  name="minPay"
  value={jobDetails.minPay}
  onChange={onChange}
  placeholder="Minimum Pay"
/>
<input
  className="border p-2 mb-2 w-full"
  type="number"
  name="maxPay"
  value={jobDetails.maxPay}
  onChange={onChange}
  placeholder="Maximum Pay"
/>
<input
  className="border p-2 mb-2 w-full"
  type="text"
  name="rate"
  value={jobDetails.rate}
  onChange={onChange}
  placeholder="Rate (e.g., per hour)"
/>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="city"
          value={jobDetails.city}
          onChange={onChange}
        />
        <input
  className="border p-2 mb-2 w-full"
  type="text"
  name="area"
  value={jobDetails.area}
  onChange={onChange}
  placeholder="Rate (e.g., per hour)"
/>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="benefits"
          value={jobDetails.benefits}
          onChange={onChange}
        />
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="jobDescription"
          value={jobDetails.jobDescription}
          onChange={onChange}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-primary rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-secondary text-white rounded"
            onClick={onSubmit}
            
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdiJobModal;
