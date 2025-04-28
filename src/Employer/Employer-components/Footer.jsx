import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Logo & Contact */}
        <div>
          <h2 className="text-xl font-bold tracking-wide">WORKNET</h2>
          <p className="mt-2 text-gray-400">+1 (7635) 547-12-97</p>
          <p className="text-gray-400">support@worknet.com</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Jobs</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
        <div className="text-center md:text-right">
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-500">
              <FaLinkedinIn />
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-400">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-300">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        <p>A product of <span className="text-white font-semibold">WORKNET</span></p>
        <p>© {new Date().getFullYear()} Worknet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
