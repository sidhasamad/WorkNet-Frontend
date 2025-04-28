import EmployerHero from "../../assets/coverImage/EmployerCover.png";
import { Button } from "../../components/Buttons";
import { EmployerNavbar } from "./navbar";
import { motion, useInView } from "framer-motion";
import Employer2nd from "../../assets/coverImage/Employer2nd.png";
import { useRef, useState } from "react";
import {
  FaUserPlus,
  FaUsers,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa";
import Footer from "./Footer";

const EmployerHome = () => {
  const steps = [
    {
      id: 1,
      title: "Create an account",
      description: "Sign up as an employer.",
      icon: <FaUserPlus size={40} className="text-gray-500" />,
    },
    {
      id: 2,
      title: "Applicants",
      description:
        "Employers can see a list of job seekers who applied for their jobs. Option to review resumes, shortlist, or reject candidates.",
      icon: <FaUsers size={40} className="text-gray-500" />,
    },
    {
      id: 3,
      title: "Post a job",
      description: "Share job openings with details.",
      icon: <FaBriefcase size={40} className="text-gray-500" />,
    },
    {
      id: 4,
      title: "Hire the best",
      description: "Finalize hiring and onboard your new employee.",
      icon: <FaCheckCircle size={40} className="text-gray-500" />,
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, threshold: 0.2 });
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <EmployerNavbar />
      <div className="relative bg-gradient-to-r from-primary to-sixth h-[720px]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-10">
          <div className="mt-6 animate-jump">
            <h1 className="text-5xl font-bold leading-tight text-gray-800">
              Hire the <span className="text-secondary">Best</span>{" "}
              <span className="text-accent">Talent</span>
              <br />
              For your company
              <br />
            </h1>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              At Worknet, we help job seekers discover the right job that
              matches their passion and skills. Explore new industries, network
              with professionals, and get tailored career insights.
            </p>
            <Button
              text="+Post a job"
              size="small"
              className="flex mr-60 ml-1"
            />
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center mt-24">
            <img
              src={EmployerHero}
              alt="Woman working on a laptop"
              className="w-[600px] h-[600px] ml-96 mb-10"
            />
          </div>
        </div>
      </div>

      {/* Employer Benefits Section */}
      <div className="flex items-center justify-center min-h-screen bg-fifth px-10">
        <motion.div
          className="flex items-center justify-center min-h-screen bg-fifth px-10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Left Side: Image */}
          <motion.div
            ref={ref}
            className={`w-1/2 transition-all duration-500 ${
              hovered ? "order-2" : "order-1"
            }`}
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <img
              src={Employer2nd}
              alt="Business Team"
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Right Side: Text */}
          <motion.div
            className={`w-1/2 pl-10 transition-all duration-500 ${
              hovered ? "order-1" : "order-2"
            }`}
          >
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Find the <span className="text-indigo-700">Best Talent</span> for
              <br />
              Your Business with Ease!
            </h1>
            <p className="text-gray-700 mt-4 text-lg">
              At Worknet, we provide employers with a seamless hiring experience
              to connect with top professionals. Our platform allows you to post
              jobs effortlessly, manage applications efficiently, and hire the
              right candidates for your business needs.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <motion.div
        className="bg-white p-10 max-w-6xl mx-auto pt-36 mb-11"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <motion.h2
          whileHover={{ color: "#B4D4FF" }}
          className="text-center text-4xl font-playfair text-blue-900 mb-10 tracking-wide pb-10"
        >
          HOW IT WORKS
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center pt-7">
          <div className="flex flex-col space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-center space-x-6"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold">
                  {step.id}
                </div> 
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default EmployerHome;
