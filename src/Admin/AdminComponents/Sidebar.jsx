import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserFriends,
  FaBell,
  FaBars,
  FaChevronLeft,
} from "react-icons/fa";
import { useState } from "react";
import { Minimize2 } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { label: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { label: "Employees", path: "/admin/totalEmployee", icon: <FaUserFriends /> },
    { label: "Employers", path: "/admin/totalEmployer", icon: <FaUserFriends /> },
    { label: "Notification", path: "/notifications", icon: <FaBell /> },
  ];

  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } bg-accent text-white transition-all duration-300 shadow-md px-4 py-6 flex flex-col`}
    >
      {/* Top - Logo and toggle */}
      <div className="flex items-center justify-between mb-8">
        {!isCollapsed && <h2 className="text-[20px] font-bold ml-10 mt-9 ">WorkNet</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <FaBars /> : <Minimize2 />}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
  to={item.path}
  className="flex items-center gap-4 px-4 py-3 rounded-md transition-all text-white hover:bg-secondary"
>
  <span className="text-lg">{item.icon}</span>
  {!isCollapsed && <span className="text-sm">{item.label}</span>}
</NavLink>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
