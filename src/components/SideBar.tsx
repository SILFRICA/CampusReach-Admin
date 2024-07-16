import React, { forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LogoWithText from "../assets/logo_with_text.png";
import SideBarData from "../data/sidebar.json";
import {
  HomeIcon,
  UserCircleIcon,
  BoltIcon,
  PowerIcon,
} from "@heroicons/react/20/solid";
import apiUrl from "../data/axios";
import axios from "axios";

const SideBar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
  >((props, ref) => {
    const navigate = useNavigate();
  const { logout, userData } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const API_URL = apiUrl('local');
      await axios.post(`${API_URL}/api/logout`, {}, {
          headers: {
              'Authorization': `Bearer ${userData.token}`
          }
      });

      // Call the logout function from the context to clear user data
      logout();

      // Redirect the user to the login page after logout
      navigate("/login");
  } catch (error) {
      if (axios.isAxiosError(error)) {
          if (error.response) {
              // Server responded with a status other than 2xx
              console.error('Server error during logout:', error.response.data);
          } else if (error.request) {
              // No response was received from the server
              console.error('Network error during logout:', error.message);
          } else {
              // Something else happened while setting up the request
              console.error('Unexpected error during logout:', error.message);
          }
      } else {
          // Non-Axios error
          console.error('Unexpected error during logout:', error);
      }
  }

  }
  const SidebarIcons = [
    <HomeIcon className="w-4 h-4" />,
    <UserCircleIcon className="w-4 h-4" />,
    <BoltIcon className="w-4 h-4" />,
  ];
  return (
    <div
      className="fixed left-0 top-0 w-64 h-full bg-white p-4 z-50 sidebar-menu transition-transform"
      ref={ref}
    >
      <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
        <img src={LogoWithText} alt="logo-alt" />
      </a>
      <ul className="mt-4">
        <span className="text-[#00a490] font-bold">SUPER ADMIN</span>
        {SideBarData &&
          SideBarData.name.map((nav, index) => (
            <li className="mb-1 group" key={index}>
              <a
                href={nav.url}
                className="flex font-semibold items-center py-2 px-4 text-[#003431] hover:bg-[#00a490] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 transition-colors"
              >
                {SidebarIcons[index]}
                <span className="text-sm">{nav.title}</span>
              </a>
            </li>
          ))}
      </ul>
      {props && (
        <ul>
          {props.children}
        </ul>
      )}
      <div className="absolute bottom-2 w-56 lg:w-full border-t-2">
        <div className="flex justify-between font-semibold items-center py-2 px-4 rounded-md text-red-600 cursor-pointer hover:bg-red-800 hover:text-white transition-colors" onClick={handleLogout}>
          <span>Logout</span>
          <PowerIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
});

export default SideBar;
