import React, { forwardRef, useContext, useState } from "react";
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
import { handleAxiosError } from "../utils/axiosError";

const SideBar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const navigate = useNavigate();
  const { logout, userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleLogout = async () => {
    setIsLoading(!isLoading);
    try {
      const API_URL = apiUrl("production");
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1000);
    } catch (error) {
      handleAxiosError(error);
    }
  };
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
      {props && <ul>{props.children}</ul>}
      <div className="absolute bottom-2 w-56 lg:w-full border-t-2">
        <div
          className={`flex justify-between font-semibold items-center py-2 px-4 rounded-md cursor-pointer ${
            isLoading ? "bg-red-700 text-white animate-pulse" : "text-red-600"
          } hover:bg-red-800 hover:text-white transition-colors`}
          onClick={handleLogout}
        >
          <span>Logout</span>
          <PowerIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
});

export default SideBar;
