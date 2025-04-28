import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EmployerNavbar } from "../../Employer-components/navbar";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaBriefcase,
  FaClock,
} from "react-icons/fa";

const GetApplicants = () => {
  const api_url = import.meta.env.VITE_EMPLOYER_URL;
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  console.log("applicants", applicants);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `${api_url}/applicants/getApplicants/${jobId}`
        );
        setApplicants(response.data.applicants);
      } catch (error) {
        console.error(
          "Error fetching applicants:",
          error.response?.data || error.message
        );
      }
    };
    fetchApplicants();
  }, [jobId]);

  return (
    <div className="w-1/3 mx-auto px-6 py-10 ">
      <EmployerNavbar />
      <h2 className="text-2xl font-bold mb-6 text-center text-accent mt-16">
        Applications for Your Jobs
      </h2>

      {applicants.length === 0 ? (
        <p className="text-center text-gray-500">No applications yet.</p>
      ) : (
        <ul className="space-y-8 ">
          {applicants.map((app, index) => (
            <li
              key={index}
              className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <p>
                <FaUser className="inline-block mr-3 text-gray-400" />
                <span className="font-thin text-gray-700 font-serif">
                  Applicant Name:
                </span>{" "}
                {app.name}
              </p>
              <p>
                <FaEnvelope className="inline-block mr-3 text-gray-400" />
                <span className="font-thin text-gray-700 font-serif">
                  Email:
                </span>{" "}
                {app.email}
              </p>
              <p>
                <FaPhone className="inline-block mr-3 text-gray-400" />
                <span className="font-thin text-gray-700 font-serif">
                  Phone:
                </span>{" "}
                {app.phonenumber}
              </p>
              <p>
                <FaFileAlt className="inline-block mr-3 text-gray-400" />
                <span className="font-thin font-serif text-gray-700 ">
                  Resume:
                </span>{" "}
                <a
                  href={app.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              </p>
              <p>
                <FaBriefcase className="inline-block mr-3 text-gray-400" />
                <span className="font-thin font-serif text-gray-700">
                  Applied For:
                </span>{" "}
                {app.jobId?.jobTitle || "N/A"}
              </p>
              <p>
                <FaClock className="inline-block mr-3 text-gray-400" />
                <span className="font-thin font-serif text-gray-700">
                  Applied At:
                </span>{" "}
                {new Date(app.appliedAt).toLocaleString()}
              </p>
              <div className="flex justify-between mt-4 space-x-4">
                <button className="flex-1 bg-chart text-white font-medium py-2 px-2 rounded-lg transition duration-300 ease-in-out">
                  Approve
                </button>
                <button className="flex-1 bg-red-600  text-white font-medium py-2 px-2 rounded-lg transition duration-300 ease-in-out">
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetApplicants;
