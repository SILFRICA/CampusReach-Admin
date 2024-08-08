import React, {
  MouseEvent,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Bars3BottomLeftIcon } from "@heroicons/react/20/solid";
import { truncateString } from "../helpers/TruncateString";
import apiUrl from "../data/axios";
import axios from "axios";
import { handleAxiosError } from "../utils/axiosError";
import { handleFullScreenMode } from "../utils/screen";

interface NavBarProps {
  sidebarToggle: (event: MouseEvent<HTMLButtonElement>) => void;
}

const NavBar: React.FC<NavBarProps> = ({ sidebarToggle }) => {
  const navigate = useNavigate();
  const { logout, refresh, userData } = useContext(AuthContext);
  const API_URL = apiUrl("production");
  const [isLoading, setIsLoading] = useState<string>("");
  const dropDownRef = useRef<HTMLUListElement>(null);

  // Function to toggle dropdown visibility
  const handleDropDownState = () => {
    if (dropDownRef.current) {
      dropDownRef.current.classList.toggle("hidden");
    }
  };

  // Function to refresh data
  const handleDataRefresh = async () => {
    setIsLoading("refreshing...");
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/refresh/data`,
        { user_id: userData.user.id },
        { headers: { Authorization: `Bearer ${userData.token}` } }
      );

      if (response.status === 200) {
        refresh(response.data.data);
      } else {
        alert("Refresh failed. Please try again later!");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading("");
    }
  };

  const handleLogout = async () => {
    setIsLoading("signing out...");
    try {
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        { headers: { Authorization: `Bearer ${userData.token}` } }
      );

      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1000);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Effect to refresh data on userData change
  useEffect(() => {}, [userData]);

  return (
    <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <button
        type="button"
        className="text-lg text-[#003431] font-semibold sidebar-toggle"
        onClick={sidebarToggle}
      >
        <Bars3BottomLeftIcon className="w-8 h-8" />
      </button>

      <span className="ml-3 text-sm font-semibold text-[#003431]">{userData.institution.name ?? "Silfrica..."}</span>

      <ul className="ml-auto flex items-center">
        {isLoading && (
          <span
            className={`${
              isLoading === "refreshing..." ? "bg-teal-600" : "bg-red-600"
            } text-white rounded-md px-2 animate-pulse`}
          >
            {isLoading}
          </span>
        )}
        <li className="dropdown">
          <button
            type="button"
            className={`text-[#003431] mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-[#00a490] ${
              isLoading && "animate-spin"
            }`}
            onClick={handleDataRefresh}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </li>
        <button id="fullscreen-button" onClick={handleFullScreenMode}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="hover:bg-[#00a490] rounded-full"
            viewBox="0 0 24 24"
            style={{ fill: "#003431", transform: "", msFilter: "" }}
          >
            <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path>
          </svg>
        </button>

        <li className="dropdown ml-3" onClick={handleDropDownState}>
          <button type="button" className="dropdown-toggle flex items-center">
            <div className="flex-shrink-0 w-10 h-10 relative">
              <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                  alt=""
                />
                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
            <div className="p-2 md:block text-left">
              <h2 className="text-sm font-semibold text-[#003431]">
                {truncateString(userData.user.email, 8)}
              </h2>
              <p className="text-xs text-[#0c554d]">
                {userData.user.user_type}
              </p>
            </div>
          </button>
          <ul
            className="dropdown-menu hidden absolute shadow-md shadow-black/5 z-30 py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]"
            ref={dropDownRef}
          >
            <li>
              <a
                href="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
              >
                Settings
              </a>
            </li>
            <li>
              <button
                role="menuitem"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
