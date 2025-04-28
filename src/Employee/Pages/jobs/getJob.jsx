import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../navbar";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEmployeeJobContext } from "../../EmployeeContext/EmployeeContext";
import savedJob from "./savedJob";
import toast from "react-hot-toast";
import ApplyJobModal from "./ApplyJobModal";

const GetJob = () => {
  const [userJob, setUserJob] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const apiUrl = import.meta.env.VITE_USER_URL;
  const navigate = useNavigate();
  // const token = localStorage.getItem("accessToken")

  const { userSaved } = useEmployeeJobContext();

  const fetchJobs = async () => {
    try {
      const filter = [];
      let url = `${apiUrl}/jobs/getUser-job`;
      if (locationFilter) filter.push(`location=${locationFilter}`);
      if (salaryFilter) filter.push(`salary=${salaryFilter}`);
      if (industryFilter) filter.push(`industry=${industryFilter}`);

      if (filter.length > 0) {
        url += `?${filter.join("&")}`;
      }
      const response = await axios.get(`${apiUrl}/jobs/getUser-job`);
      if (response.data && Array.isArray(response.data.data)) {
        setUserJob(response.data.data);
      } else {
        setUserJob([]);
      }
    } catch (error) {
      console.error("Fetching error", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [locationFilter, salaryFilter, industryFilter]);

  console.log("jobs", userJob);
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div>
      <Navbar />

      <div className="p-4 flex gap-12">
        <div className="flex flex-col gap-4 mt-28 w-1/6">
          <select
            className=" p-2 focus:outline-none focus:border-blue-500"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">Location</option>
            <option value="Malappuram">Malappuram</option>
            <option value="Calicut">Calicut</option>
            <option value="Banglore">Bangalore</option>
            <option value="kochi">Kochi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="chennai">Chennai</option>
            <option value="pune">Pune</option>
            <option value="mumbai">Mumbai</option>
          </select>

          <select
            className=" p-2 focus:outline-none focus:border-blue-500"
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
          >
            <option value="">Salary</option>
            <option value="50000">₹50,000+</option>
            <option value="70000">₹70,000+</option>
            <option value="100000">₹1,00,000+</option>
          </select>

          <select
            className=" p-2 focus:outline-none focus:border-blue-500"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <option value="">Industry</option>
            <option value="MernStack">MERN Stack</option>
            <option value="Frontend">Frontend Developer</option>
            <option value="Backend">Backend Developer</option>
            <option value="DotNet">.NET Developer</option>
            <option value="Python-Django">Python Django</option>
          </select>

          <p
            onClick={fetchJobs}
            className="hover:text-accent text-secondary py-2 rounded text-sm font-medium transition "
          >
            Apply Filters
          </p>
        </div>
        <div className="">
          {userJob.length === 0 ? (
            <p className="text-center text-lg text-gray-500">
              No job posts available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ">
              {userJob.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mt-28 mr-7"
                >
                  {job.employer && job.employer.Logo && (
                    <div className="flex">
                      <img
                        src={job.employer.Logo}
                        alt="Company Logo"
                        className="w-14 h-15 object-cover rounded-full mb-4 mx-auto ml-2"
                      />
                      <h1 className="mr-28 text-accent font-bold mt-3">
                        {job.companyName}
                      </h1>
                      <FaBookmark
                        className="text-gray-500"
                        onClick={() => userSaved({ jobId: job._id })}
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {job.jobTitle}
                  </h3>
                  <h4 className="text-lg text-gray-600 font-sm text-[15px] mb-2">
                    {job.company_email}
                  </h4>
                  <h4 className="text-lg font-medium text-blue-500 mb-4">
                    {job.jobs_location}
                  </h4>
                  <div className="flex justify-between items-center">
                    <button
                      className="text-sm text-teal-500 hover:text-teal-600 "
                      onClick={() =>
                        navigate(`/jobs-employeeDetails/${job._id}`)
                      }
                    >
                      Details
                    </button>
                    <button
                      className="text-sm text-secondary hover:text-blue-600"
                      onClick={() => handleApplyClick(job)}
                     
                    >
                     Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showModal && selectedJob && (
        <ApplyJobModal job={selectedJob} closeModal={closeModal} />
      )}
    </div>
  );
};

export default GetJob;
