// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { EmployerNavbar } from "../../Employer-components/navbar";
// import { FaFileAlt } from "react-icons/fa";
// import toast from "react-hot-toast";
// import DatePicker from "react-datepicker";

// const GetApplicants = () => {
//   const api_url = import.meta.env.VITE_EMPLOYER_URL;
//   const { jobId } = useParams();
//   const [applicants, setApplicants] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [filteredApplicants, setFilteredApplicants] = useState([]);
//   const [error, setError] = useState("");
//   const [showScheduleModal, setShowScheduleModal] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);
//   const [interviewDate, setInterviewDate] = useState(new Date());
//   const [interviewTime, setInterviewTime] = useState(new Date());

//   useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
//         const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
//         if (!token) {
//           throw new Error("Authentication token missing");
//         }
//         const response = await axios.get(
//           `${api_url}/applicants/getApplicants/${jobId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("Fetched applicants:", response.data.applicants);
//         setApplicants(response.data.applicants);
//         setError("");
//       } catch (error) {
//         const errorMsg = error.response?.data?.message || "Failed to fetch applicants";
//         setError(errorMsg);
//         toast.error(errorMsg);
//         console.error("Fetch applicants error:", error.response || error);
//       }
//     };
//     fetchApplicants();
//   }, [jobId]);

//   const handleAction = async (id, status) => {
//     try {
//       const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
//       if (!token) {
//         throw new Error("Authentication token missing");
//       }
//       const response = await axios.put(
//         `${api_url}/applicants/updateStatus/${id}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Update response:", response.data);
//       setApplicants((prev) =>
//         prev.map((app) =>
//           app._id === id ? { ...response.data } : app
//         )
//       );
//       toast.success(`Applicant ${status.toLowerCase()} successfully`);
//       setError("");
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || `Failed to update status to ${status}`;
//       setError(errorMsg);
//       toast.error(errorMsg);
//       console.error("Update status error:", error.response || error);
//     }
//   };

//   useEffect(() => {
//     if (filter === "All") {
//       setFilteredApplicants(applicants);
//     } else {
//       setFilteredApplicants(applicants.filter((app) => app.status === filter));
//     }
//   }, [filter, applicants]);

//   const handleScheduleInterview = (applicant) => {
//     setSelectedApplicant(applicant);
//     setShowScheduleModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowScheduleModal(false);
//     setSelectedApplicant(null);
//   };

//   const handleScheduleSubmit = () => {
//     // Send the scheduled interview date/time to the backend or email.
//     console.log("Scheduled Interview for", selectedApplicant.name, interviewDate);

//     // Close modal after scheduling
//     setShowScheduleModal(false);
//     toast.success(`Interview scheduled for ${selectedApplicant.name}`);
//   };

//   return (
//     <div className=" mx-auto px-6 py-10">
//       <EmployerNavbar />
//       <h2 className="text-2xl font-bold mb-6 text-center text-accent mt-16">
//         Applications for Your Jobs
//       </h2>

//       <div className="mb-4">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border px-4 py-2 rounded-md bg-gray-200"
//         >
//           <option value="All">All</option>
//           <option value="Approved">Approved</option>
//           <option value="Rejected">Rejected</option>
//           <option value="Pending">Pending</option>
//         </select>
//       </div>

//       {error && (
//         <p className="text-red-600 text-center text-sm font-medium mb-4">{error}</p>
//       )}

//       {filteredApplicants.length === 0 ? (
//         <p className="text-center text-gray-500">No applications yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-3 px-4 border-b">Name</th>
//                 <th className="py-3 px-4 border-b">Email</th>
//                 <th className="py-3 px-4 border-b">Phone</th>
//                 <th className="py-3 px-4 border-b">Resume</th>
//                 <th className="py-3 px-4 border-b">Job Title</th>
//                 <th className="py-3 px-4 border-b">Experience</th>
//                 <th className="py-3 px-4 border-b">Expected CTC</th>
//                 <th className="py-3 px-4 border-b">Applied At</th>
//                 <th className="py-3 px-4 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredApplicants.map((app) => (
//                 <tr key={app._id} className="text-center hover:bg-gray-50">
//                   <td className="py-3 px-4 border-b">{app.name}</td>
//                   <td className="py-3 px-4 border-b">{app.email}</td>
//                   <td className="py-3 px-4 border-b">{app.phonenumber}</td>
//                   <td className="py-3 px-4 border-b">
//                     <a
//                       href={app.resume}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline flex items-center justify-center gap-2"
//                     >
//                       <FaFileAlt className="text-gray-400" /> View
//                     </a>
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     {app.jobId?.jobTitle || "N/A"}
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     {app.fresherOrExperienced || "N/A"}
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     {app.expectedCTC ? `₹${app.expectedCTC}` : "N/A"}
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     {new Date(app.appliedAt).toLocaleString()}
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     <div className="flex gap-2 justify-center">
//                     {app.status === "Approved" ? (
//   <>
//     <button
//       className="bg-green-500 text-white py-1 px-3 rounded cursor-default"
//       disabled
//     >
//       Approved
//     </button>
//     <button
//       className=" text-secondary  rounded"
//       onClick={() => handleScheduleInterview(app)}
//     >
//       Schedule Interview
//     </button>
//   </>
// ) : app.status === "Rejected" ? (
//   <button className="bg-red-500 text-white py-1 px-3 rounded cursor-default" disabled>
//     Rejected
//   </button>
// ) : (
//   <>
//     <button
//       className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
//       onClick={() => handleAction(app._id, "Approved")}
//     >
//       Approve
//     </button>
//     <button
//       className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
//       onClick={() => handleAction(app._id, "Rejected")}
//     >
//       Reject
//     </button>
//   </>
// )}

//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

// {showScheduleModal && selectedApplicant && (
//   <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//     <div className="bg-white p-6 rounded-md shadow-md">
//       <h3 className="text-xl font-bold mb-4">Schedule Interview for {selectedApplicant.name}</h3>
//       <div className="mb-4">
//         <label className="block mb-2">Select Interview Date and Time:</label>
//         <DatePicker
//           selected={interviewDate}
//           onChange={(date) => setInterviewDate(date)}
//           showTimeSelect
//           timeFormat="HH:mm"
//           timeIntervals={15}
//           dateFormat="MMMM d, yyyy h:mm aa"
//           className="border px-4 py-2 rounded-md bg-gray-200 w-full"
//         />
//       </div>
//       <div className="flex gap-2 justify-end">
//         <button
//           className="bg-gray-500 text-white px-4 py-2 rounded"
//           onClick={handleCloseModal}
//         >
//           Close
//         </button>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={handleScheduleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default GetApplicants;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EmployerNavbar } from "../../Employer-components/navbar";
import { FaFileAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";

const GetApplicants = () => {
  const api_url = import.meta.env.VITE_EMPLOYER_URL;
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [error, setError] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [interviewDate, setInterviewDate] = useState(new Date());
  const [interviewTime, setInterviewTime] = useState(new Date());

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token =
          localStorage.getItem("token") || localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authentication token missing");
        }
        const response = await axios.get(
          `${api_url}/applicants/getApplicants/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplicants(response.data.applicants);
        setError("");
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || "Failed to fetch applicants";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const handleAction = async (id, status) => {
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication token missing");
      }
      const response = await axios.put(
        `${api_url}/applicants/updateStatus/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplicants((prev) =>
        prev.map((app) => (app._id === id ? { ...response.data } : app))
      );
      toast.success(`Applicant ${status.toLowerCase()} successfully`);
      setError("");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || `Failed to update status to ${status}`;
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    if (filter === "All") {
      setFilteredApplicants(applicants);
    } else {
      setFilteredApplicants(applicants.filter((app) => app.status === filter));
    }
  }, [filter, applicants]);

  const handleScheduleInterview = (applicant) => {
    setSelectedApplicant(applicant);
    setShowScheduleModal(true);
  };

  const handleCloseModal = () => {
    setShowScheduleModal(false);
    setSelectedApplicant(null);
  };

  const handleScheduleSubmit = async () => {
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication token missing");
      }

      // Send interview scheduling data to backend API
      const response = await axios.post(
        `${api_url}/scheduleInterview`,
        {
          applicationId: selectedApplicant._id,
          interviewDate: interviewDate,
          interviewTime: interviewTime,
          jobId: jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If successful, close the modal and update UI
      setShowScheduleModal(false);
      toast.success(`Interview scheduled for ${selectedApplicant.name}`);

      // Optionally, update applicants' status or other UI elements as needed
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to schedule interview";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="mx-auto px-6 py-10">
      <EmployerNavbar />
      <h2 className="text-2xl font-bold mb-6 text-center text-accent mt-16">
        Applications for Your Jobs
      </h2>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded-md bg-gray-200"
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {error && (
        <p className="text-red-600 text-center text-sm font-medium mb-4">
          {error}
        </p>
      )}

      {filteredApplicants.length === 0 ? (
        <p className="text-center text-gray-500">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Phone</th>
                <th className="py-3 px-4 border-b">Resume</th>
                <th className="py-3 px-4 border-b">Job Title</th>
                <th className="py-3 px-4 border-b">Experience</th>
                <th className="py-3 px-4 border-b">Expected CTC</th>
                <th className="py-3 px-4 border-b">Applied At</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((app) => (
                <tr key={app._id} className="text-center hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{app.name}</td>
                  <td className="py-3 px-4 border-b">{app.email}</td>
                  <td className="py-3 px-4 border-b">{app.phonenumber}</td>
                  <td className="py-3 px-4 border-b">
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center justify-center gap-2"
                    >
                      <FaFileAlt className="text-gray-400" /> View
                    </a>
                  </td>
                  <td className="py-3 px-4 border-b">
                    {app.jobId?.jobTitle || "N/A"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {app.fresherOrExperienced || "N/A"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {app.expectedCTC ? `₹${app.expectedCTC}` : "N/A"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {new Date(app.appliedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex gap-2 justify-center">
                    {app.status === "Scheduled" ? (
  <button
    className="bg-green-500 text-white py-1 px-3 rounded cursor-default"
    disabled
  >
    Scheduled
  </button>
) : app.status === "Approved" ? (
  <>
    <button
      className="bg-yellow-500 text-white py-1 px-3 rounded cursor-default"
      disabled
    >
      Approved
    </button>
    <button
      className="text-white bg-blue-500 rounded px-2"
      onClick={() => handleScheduleInterview(app)}
    >
      Schedule Interview
    </button>
  </>
) : app.status === "Rejected" ? (
  <button
    className="bg-red-500 text-white py-1 px-3 rounded cursor-default"
    disabled
  >
    Rejected
  </button>
) : (
  <>
    <button
      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
      onClick={() => handleAction(app._id, "Approved")}
    >
      Approve
    </button>
    <button
      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
      onClick={() => handleAction(app._id, "Rejected")}
    >
      Reject
    </button>
  </>
)}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showScheduleModal && selectedApplicant && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-4">
              Schedule Interview for {selectedApplicant.name}
            </h3>
            <div className="mb-4">
              <label className="block mb-2">
                Select Interview Date and Time:
              </label>
              <DatePicker
                selected={interviewDate}
                onChange={(date) => setInterviewDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="border px-4 py-2 rounded"
              />
            </div>
            <button
              onClick={handleScheduleSubmit}
              className="bg-blue-500 text-white py-2 px-6 rounded"
            >
              Schedule Interview
            </button>
            <button
              onClick={handleCloseModal}
              className="ml-4 bg-gray-300 py-2 px-6 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetApplicants;
