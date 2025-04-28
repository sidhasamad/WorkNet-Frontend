
import React, { useEffect, useState } from 'react';
import { EmployerNavbar } from '../../Employer-components/navbar';
import AddJobButton from '../../Employer-components/AddJobButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, IndianRupee, LocateIcon } from 'lucide-react';

const JobPost = () => {
  const [jobs, setJobs] = useState([]);
  const api_url = import.meta.env.VITE_EMPLOYER_URL;
  const navigate = useNavigate();
  const email = localStorage.getItem('employerEmail');
  const handleViewApplicants=()=>{
    navigate(`/applicants/${jobId._id}`)
  }
  const fetchJobs = async () => {
    try {
      if (!email) {
        toast.error("Email not found");
        return;
      }
      const response = await axios.get(`${api_url}/jobPost/getJobPost?email=${email}`, {
        withCredentials: true,
      });
      const jobPosts = response.data.data;
      setJobs(jobPosts);
    } catch (error) {
      console.error("Error while fetching jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployerNavbar />

      <div className="flex justify-end px-6 py-6 mt-20">
        <AddJobButton />
      </div>

      <div className="container mx-auto px-4 py-6">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white hover:bg-gray-100 transition-all rounded-2xl shadow-md hover:shadow-lg p-6 cursor-pointer border border-gray-200"
              >
                <h1 className="text-xl font-bold text-accent">{job.jobTitle}</h1>
                <h1>{job.company_email}</h1>
                <h2 className="text-gray-700 mt-1 flex items-center gap-2">
                  <Briefcase size={16} /> {job.companyName}
                </h2>

                <div className="text-gray-500 mt-2 flex items-center gap-2">
                  <MapPin size={16} /> {job.jobs_location || "Location not specified"}
                </div>

                <div className="text-gray-600 mt-2 flex items-center gap-2">
                  <IndianRupee size={16} />
                  ₹{job.minPay} - ₹{job.maxPay} ({job.rate})
                </div>

                <div className="text-gray-600 mt-2 flex items-center gap-2">
                  <LocateIcon size={16} /> {job.city}
                </div>

                <div className="mt-4 flex justify-around">
                  <button 
                  className='px-4 py-2 bg-secondary text-white text-sm rounded-md hover:bg-accent mr-16'
                  onClick={()=>navigate(`/applicants/${job._id}`)}
                
                  >
                    View Applicants
                  </button>
                  <button 
                    className="px-4 py-2 bg-secondary text-white text-sm rounded-md hover:bg-accent ml-28 "
                    onClick={() => navigate(`/jobPost/${job._id}`)}

                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">No job posted yet!</p>
        )}
      </div>
    </div>
  );
};

export default JobPost;
