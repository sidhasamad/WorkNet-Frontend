import React from 'react';
import HappyTeam from '../../assets/coverImage/HappyTeam.png'
import ShakeHand from '../../assets/coverImage/shakehand.png'
import { Navbar } from './navbar';
import Footer from '../../Employer/Employer-components/Footer';
import { useNavigate } from 'react-router-dom';

const EmployeeAbout = () => {
  const navigate=useNavigate()
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <Navbar/>
     
<div
  // className="bg-cover bg-center h-[20vh] flex items-center justify-center text-white text-4xl font-bold mt-"
  // style={{ backgroundImage: `url(${teamWork})` }}
>
  <h1 className='mt-28 flex justify-center items-center  text-accent text-3xl font-bold'>  About Us
  </h1>
</div>

      {/* Section 1 - Career Management Text + Image */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 py-16 bg-white max-w-6xl mx-auto">
        <div className="w-full lg:w-1/2 space-y-4">
          <span className="text-secondary font-bold uppercase">Our Services</span>
          <h2 className="text-3xl font-bold">
            Hear what people are saying about career <span className="text-accent">Management</span>.
          </h2>
          <p className="text-gray-600">
            We provide coaching and career guidance to help employees make better job decisions and grow in their careers.
          </p>
          <button className="mt-4 px-6 py-2 bg-chart text-white rounded-full">View Our Services</button>
        </div>
        <img
          src={HappyTeam}
          alt="Happy team"
          className="w-full lg:w-[40%] rounded-lg shadow-md mt-10 lg:mt-0"
        />
      </section>

      {/* Section 2 - Features */}
      <section className="bg-[#f4f1fb] py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            Hear what people are saying about <span className="text-accent">career Management</span>.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Business Progress',
                desc: 'Grow and adapt in a changing environment.',
              },
              {
                title: 'Business Administration',
                desc: 'Learn how to manage tasks efficiently.',
              },
              {
                title: 'Secret Success Teamwork',
                desc: 'Boost your productivity with smart collaboration.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-2 text-seven">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Testimonial */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-chart1">“How we can improve your Business with our Coaching.”</h2>
        <p className="text-gray-600 mb-6">
          Join our platform and start building a future that works for you.
        </p>
        <ul className="text-left list-disc list-inside text-gray-600">
          <li>Certified Career Mentors</li>
          <li>24/7 Job Alerts</li>
          <li>Resume & Interview Tips</li>
        </ul>
      </section>

      {/* Section 4 - Image + Text */}
      <section className="bg-[#f4f1fb] py-16 px-6 flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
        <img src={ShakeHand} alt="Employee" className="w-full lg:w-1/3 rounded-lg shadow-md" />
        <div className="w-full lg:w-1/2 lg:pl-10 mt-8 lg:mt-0 space-y-4">
          <h3 className="text-2xl font-bold text-chart1">We support your career journey</h3>
          <p className="text-gray-700">
            Explore top job opportunities, receive alerts, and boost your confidence with our career support programs.
          </p>
          <button className="mt-4 px-6 py-2 bg-accent text-white rounded-full" onClick={()=>navigate('/jobs-employee')}>Explore Now</button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default EmployeeAbout;
