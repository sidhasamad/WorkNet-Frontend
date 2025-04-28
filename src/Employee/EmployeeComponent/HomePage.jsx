// import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import userHero from "../../assets/coverImage/userHero.png";
import { Navbar } from "../Pages/navbar";
import { useState } from "react";
import Footer from "../../Employer/Employer-components/Footer";
// import { motion } from "framer-motion";

const HomePage = () => {
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirect to search results page with query param (or you can filter data here)
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="relative bg-primary  h-[750px]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-10 ">
          {/* Left Text Section */}
          <div className="mt-6">
            <h1 className="text-5xl  font-bold leading-tight text-gray-800">
              Find Your <span className="text-blue-600">Dream Job</span> <br />
              With Your Interest <br />
              And Skills
            </h1>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              At Worknet, we help job seekers discover the right job that
              matches their passion and skills. Explore new industries, network
              with professionals, and get tailored career insights.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center mt-10 ">
            <img
              src={userHero}
              alt="Woman working on a laptop"
              className="w-[700px] h-[700px] ml-96 mb-2"
            />
          </div>
        </div>
      </div>


  {/* ============================================================2nd section============================================= */}


  <div className="min-h-screen bg-[#d0d5ec] flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        {/* <h1 className="text-4xl sm:text-4xl font-bold text-gray-900 leading-tight mb-11 ">
          Search <span className="text-black font-bold ">,Apply &</span> <br />
          Get your <span className="text-secondary ">Dream Jobs</span>
        </h1> */}

<h1 className="text-4xl sm:text-4xl font-bold text-gray-900 leading-tight mb-11 font-poppins animate-bounce">
  Search <span className="text-black font-bold">,Apply &</span> <br />
  Get your <span className="text-secondary">Dream Jobs</span>
</h1>


        <p className="text-gray-700 mt-4 text-sm sm:text-base">
          Discover career opportunities that match your <span className="text-blue-700">interests</span> and skills, helping you land the perfect role effortlessly.
        </p>

        {/* Search Bar */}
        <div className="mt-8 relative w-full max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Find your Dream Jobs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-5 pr-12 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-secondary"
          >
            <Search size={24} />
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="bg-[#e2e4eb] text-gray-800 py-2 px-5 rounded-full hover:bg-purple-100 transition">
            FullStack Developer
          </button>
          <button className="bg-[#e2e4eb] text-gray-800 py-2 px-5 rounded-full hover:bg-purple-100 transition">
            Frontend Developer
          </button>
          <button className="bg-[#e2e4eb] text-gray-800 py-2 px-5 rounded-full hover:bg-purple-100 transition">
            Backend Developer
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default HomePage;
