import React from 'react'

const Stepper = ({currentStep}) => {
  const steps=[
    "Employer Information",
    "Job Basics",
    "Compensation Details",
    "Role Overview",
    "Review"
  ]
  return (
    <div className="flex justify-center items-center mb-4 ">
    {steps.map((step, index) => (
      <div key={index} className="flex items-center">
        <div
          className={`w-8 h-8 flex justify-center items-center rounded-full text-white font-semibold 
          ${index + 1 === currentStep ? "bg-seven" : "bg-gray-200"}`}
        >
          {index + 1}
        </div>
        <span
          className={`ml-2 text-sm ${
            index + 1 === currentStep ? "text-accent font-bold" : "text-gray-300"
          }`}
        >
          {step}
        </span>
        {index !== steps.length - 1 && (
          <div className="w-12 h-1 bg-gray-300 mx-2"></div>
        )}
      </div>
    ))}
  </div>
  )
}

export default Stepper
