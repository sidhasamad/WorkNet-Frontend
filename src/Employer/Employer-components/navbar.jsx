import { FaBell, FaComment, FaCommentDots, FaComments, FaEnvelope, FaFacebookMessenger, FaPaperPlane, FaRegEnvelope, FaRegPaperPlane, FaUser } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import EmployerProfileModal from "../Pages/EmployerProfileModal";

export const EmployerNavbar = ()=>{
  const navigate=useNavigate()
  return (
    <>
    <nav className="bg-primary w-full text-secondary shadow-lg fixed top-0 left-0 z-50">
<div className="container mx-auto px-4 py-3 flex justify-between items-center">
  <div className="flex items-center gap-2">
    <img src={logo} alt="worknet" className="w-9 mb-2 mt-2 ml-10" />
    <h1
      className="text-xl font-bold text-accent"
      onClick={() => navigate("/")}
    >
      WorkNet
    </h1>
  </div>
  <div className="mr-16">
    <ul className="flex space-x-6 gap-14">
      <li
        className="cursor-pointer hover:text-secondary"
        onClick={() => navigate("/employer-homePage")}
      >
        Home
      </li>
      <li
        className="cursor-pointer  hover:text-secondary"
        onClick={() => navigate("/jobPost")}
      >
        Job post
      </li>
      {/* <li
        className="cursor-pointer hover:text-secondary"
        onClick={() => navigate("/applicants/:id")}
      >
        Applicants
      </li>
       */}
    </ul>
  </div>

  <div className="flex items-center space-x-10 mr-9 ">
  <FaBell
  className="text-xl cursor-pointer text-gray-400 hover:text-secondary"
  onClick={() => navigate("/employernotifications")}
/>
<FaFacebookMessenger
  className="text-xl cursor-pointer text-gray-400 hover:text-secondary"
  onClick={() => navigate("/employermessages")}
/>
    <EmployerProfileModal/>
  </div>
</div>
</nav>

    </>
  )
}


