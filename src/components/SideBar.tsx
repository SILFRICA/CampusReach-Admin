import React, { forwardRef } from "react";
import LogoWithText from "../assets/logo_with_text.png";
import SideBarData from "../data/sidebar.json";
import { HomeIcon, UserCircleIcon, BoltIcon } from "@heroicons/react/20/solid";

const SideBar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
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
            <li className="mb-1 group">
              <a
                href=""
                className="flex font-semibold items-center py-2 px-4 text-[#003431] hover:bg-[#00a490] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 transition-colors"
              >
                {SidebarIcons[index]}
                <span className="text-sm">{nav}</span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
});

export default SideBar;
