import React from 'react';
import { Navbar } from './navbar';
import Footer from '../../Employer/Employer-components/Footer';

const EmployeeContact = () => {
  return (
    <div className="bg-gradient-to-b from-[#C5D3E8] to-white min-h-screen text-gray-900 font-sans ">
      <Navbar/>
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-white mt-11">Contact Us</h1>
        <p className="text-gray-400 mt-2">Looking for a design partner? You found.</p>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-10 mb-5">
        {/* Left Info */}
        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-accent mt-20">What will be next step?</h2>
          <p className="text-gray-600 mb-6">You are one step closer to building your perfect product</p>
          <ol className="list-decimal list-inside space-y-4 text-sm text-gray-700">
            <li>
              <span className="font-semibold">We’ll prepare a proposal</span> <br />
              Required scope, timeline, and pricing will be provided based on your project.
            </li>
            <li>
              <span className="font-semibold">Together we discuss it</span> <br />
              Let’s get to know each other and discuss the project in detail.
            </li>
            <li>
              <span className="font-semibold">Let’s start building</span> <br />
              We sign the agreement and start working on your product right away.
            </li>
          </ol>
        </div>

        {/* Right Form */}
        <div className="lg:w-1/2 bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-lg font-semibold mb-6 text-chart1">
            Write us a few words about your project and we’ll prepare a proposal for you within <span className="text-secondary font-bold">24 hours</span>.
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="border p-2 rounded" placeholder="Your Name" />
              <input className="border p-2 rounded" placeholder="Your E-mail" />
              <input className="border p-2 rounded" placeholder="Company" />
              <input className="border p-2 rounded" placeholder="Approx. Budget" />
            </div>
            <textarea className="w-full border p-2 rounded" rows="4" placeholder="Project details (optional)" />
            <div className="border border-dashed p-4 text-center rounded text-gray-500">
              DROP IT LIKE IT’S HOT 🔥 (File Upload placeholder)
            </div>
            <button type="submit" className="w-full bg-chart text-white py-2 rounded hover:bg-[#1A1C3C]">
              Send
            </button>
          </form>
        </div>
      </div>
     <Footer/>

    </div>
  );
};

export default EmployeeContact;
