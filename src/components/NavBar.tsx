import React, {
  MouseEvent,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Bars3BottomLeftIcon, EnvelopeIcon, PowerIcon } from "@heroicons/react/20/solid";
import apiUrl from "../data/axios";
import axios from "axios";
import { handleAxiosError } from "../utils/axiosError";
import { handleFullScreenMode } from "../utils/screen";

interface NavBarProps {
  sidebarToggle: (event: MouseEvent<HTMLButtonElement>) => void;
}

const NavBar: React.FC<NavBarProps> = ({ sidebarToggle }) => {
  const navigate = useNavigate();
  const { logout, userData } = useContext(AuthContext);
  const API_URL = apiUrl("production");
  const [isLoading, setIsLoading] = useState<string>("");

  // Function to toggle dropdown visibility
//   const handleDropDownState = () => {
//     if (dropDownRef.current) {
//       dropDownRef.current.classList.toggle("hidden");
//     }
//   };

  // Function to refresh data
//   const handleDataRefresh = async () => {
//     setIsLoading("refreshing...");
//     try {
//       const response = await axios.post(
//         `${API_URL}/api/admin/refresh/data`,
//         { user_id: userData.user.id },
//         { headers: { Authorization: `Bearer ${userData.token}` } }
//       );

//       if (response.status === 200) {
//         updateUser(response.data.data);
//       } else {
//         alert("Refresh failed. Please try again later!");
//       }
//     } catch (error) {
//       handleAxiosError(error);
//     } finally {
//       setIsLoading("");
//     }
//   };

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
    <div className="py-2 px-6 bg-white flex items-center border-b border-black sticky top-0 left-0 z-30">
      <button
        type="button"
        className="text-lg text-[#003431] font-semibold sidebar-toggle"
        onClick={sidebarToggle}
      >
        <Bars3BottomLeftIcon className="w-8 h-8" />
      </button>

      <span className="ml-3 text-xl font-semibold text-black">{userData.institution.name ?? "Silfrica..."}</span>

      <ul className="ml-auto flex items-center">
        {isLoading && (
          <span
            className={`${
              isLoading === "syncing..." ? "bg-[#03CF79]" : "bg-[#FF2055]"
            } text-white rounded-md px-2 animate-pulse`}
          >
            {isLoading}
          </span>
        )}
        <li className="dropdown">
          <button
            type="button"
            className={`text-black mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-[#FF2055] ${
              isLoading && "animate-pulse"
            }`}
            onClick={handleLogout}
          >
            <PowerIcon className="w-5 h-5"/>
          </button>
        </li>
        <button id="fullscreen-button" onClick={handleFullScreenMode}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="hover:scale-105 rounded-full"
            viewBox="0 0 24 24"
            style={{ fill: "#003431", transform: "", msFilter: "" }}
          >
            <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path>
          </svg>
        </button>

        <li className="dropdown ml-3">
          <button type="button" className="dropdown-toggle flex items-center">
            <div className="flex-shrink-0 relative">
                <EnvelopeIcon className="w-5 h-5"/>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
