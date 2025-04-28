import React, { useEffect } from "react";
import { useEmployeeJobContext } from "../../EmployeeContext/EmployeeContext";
import { Navbar } from "../navbar";
import { FaTrash } from "react-icons/fa";

const SavedJob = () => {
  const { getSaved, savedJobs } = useEmployeeJobContext();

  useEffect(() => {
    getSaved();
  }, []);
  return (
    <div className="p-4">
      <Navbar />
      <h2 className="text-[20px] font-bold mb-4 mt-20 ml-10">Saved Jobs</h2>

      {savedJobs.length === 0 ? (
        <p className="text-gray-500">You have not saved any jobs yet.</p>
      ) : (
        <div className="">
          {savedJobs.length === 0 ? (
            <p className="text-center text-lg text-gray-500">
              No job posts available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 ">
              {savedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mt-4 mr-7 ml-10"
                >
                  {job.employer && job.employer.Logo && (
                    <div className="flex">
                      <img
                        src={job.employer.Logo}
                        alt="Company Logo"
                        className="w-14 h-15 object-cover rounded-full mb-4 mx-auto ml-2 ml-5"
                      />
                      <h1 className="mr-28 text-accent font-bold mt-3">
                        {job.companyName}
                      </h1>
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
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJob;










// import React, { useEffect } from 'react'
// import { useEmployeeJobContext } from '../../EmployeeContext/EmployeeContext'
// import { Navbar } from '../navbar'
// import { FaTrash } from 'react-icons/fa'

// const SavedJob = () => {
//   const { getSaved, savedJobs, DeleteSavedPost } = useEmployeeJobContext()

//   useEffect(() => {
//     getSaved()
//   }, [])

//   return (
//     <div className="p-4">
//       <Navbar />
//       <h2 className="text-[20px] font-bold mb-4 mt-20 ml-10">Saved Jobs</h2>

//       {savedJobs.length === 0 ? (
//         <p className="text-gray-500">You have not saved any jobs yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
//           {savedJobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mt-4 mr-7 ml-10"
//             >
//               {job.employer && job.employer.Logo && (
//                 <div className="flex items-center mb-4">
//                   <img
//                     src={job.employer.Logo}
//                     alt="Company Logo"
//                     className="w-16 h-16 object-cover rounded-full mr-4"
//                   />
//                   <h1 className="text-accent font-bold">{job.companyName}</h1>
//                   <FaTrash
//                     onClick={() => DeleteSavedPost(job._id)}
//                     className="ml-auto cursor-pointer hover:text-red-500 transition-colors"
//                     title="Delete Saved Job"
//                   />
//                 </div>
//               )}

//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 {job.jobTitle}
//               </h3>
//               <h4 className="text-lg text-gray-600 font-sm text-[15px] mb-2">
//                 {job.company_email}
//               </h4>
//               <h4 className="text-lg font-medium text-blue-500 mb-4">
//                 {job.jobs_location}
//               </h4>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default SavedJob
