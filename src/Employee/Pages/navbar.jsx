import { FaBell, FaBookmark, FaUser } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import EmployeeProfileModal from "./EmployeeProfileModal";

export const Navbar = ()=>{
  const navigate=useNavigate()
  
  return (
    <>
    <nav className="bg-primary w-full text-white shadow-lg fixed top-0 left-0 z-50">
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
        className="cursor-pointer hover:underline"
        onClick={() => navigate("/")}
      >
        Home
      </li>
      <li
        className="cursor-pointer hover:underline"
        onClick={() => navigate("/jobs-employee")}
      >
        Jobs
      </li>
      <li
        className="cursor-pointer hover:underline"
        onClick={() => navigate("/employeeAbout")}
      >
        About
      </li>
      <li
        className="cursor-pointer hover:underline"
        onClick={() => navigate("/employeeContact")}
      >
        Contact
      </li>
    </ul>
  </div>

  <div className="flex items-center space-x-2 mr-9 gap-2 ">
  {localStorage.getItem("token") || localStorage.getItem("accessToken")? (
  <>
    <FaBookmark
      className="text-xl cursor-pointer text-secondary"
      onClick={() => navigate('/employeeSavedJob')}
    />
    <FaBell
      className="text-xl cursor-pointer text-secondary"
      onClick={() => navigate("/employeenotifications")}
    />
  </>
) : (
  <button
    className="text-secondary px-4 py-2 rounded-lg font-semibold hover:text-accent"
    onClick={() => navigate("/main")}
  >
    Signup
  </button>
)}

<EmployeeProfileModal />

</div>

</div>
</nav>

    </>
  )
}