import React, { forwardRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoWithText from "../assets/logo_with_text.png";
import SideBarData from "../data/sidebar.json";
import { NavLink } from "react-router-dom";

interface SideBarProps {
  isOpen: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}

interface User {
  firstname: string;
  lastname: string;
  user_type: string;
}

const SideBar = forwardRef<HTMLDivElement, SideBarProps & React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { userData } = useContext(AuthContext);

  // If userData is not available, show the loading animation
  if (!userData) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <img
          src={LogoWithText}
          alt="logo"
          className="animate-breathing w-[120px]"
        />
      </div>

    );
  }

  const user = userData.user as unknown as User;

  return (
    <div
      className="fixed left-0 top-0 w-64 h-full bg-white p-4 z-50 sidebar-menu transition-transform border-r border-black flex flex-col items-center"
      ref={ref}
    >
      <a href="#" className="w-[150.86px] pb-4">
        <img src={LogoWithText} alt="logo-alt" />
      </a>
      <div className="h-[85vh] relative flex flex-col items-center w-full">
        <ul className="mt-4 w-[163px] h-[416px] flex flex-col items-start">
          {SideBarData.name.map((nav, index) => (
            <li className="mb-1 group h-[56px] text-center" key={index}>
              {nav.title === "Content" || nav.title === "Settings" ? (
                <div
                  className="text-black hover:opacity-50 cursor-not-allowed"
                  onClick={(e) => e.preventDefault()}
                  title="Coming Soon"
                >
                  <span className="text-xl font-semibold">{nav.title}</span>
                </div>
              ) : (
                <NavLink
                  to={nav.url}
                  className={({ isActive }) =>
                    isActive ? 'text-[#03CF79]' : 'text-black'
                  }
                >
                  <span className="text-xl font-semibold">{nav.title}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {props.children && <ul>{props.children}</ul>}

        <a
          className="w-[199px] h-[56px] bg-[#03CF79] text-white flex justify-center items-center text-xl font-semibold"
          href="#"
        >
          Find channel
        </a>

        <br />
        <div className="flex w-[201px] h-12 gap-4 justify-evenly">
          <div className="w-12 bg-[#D9D9D9] rounded-full focus:outline-none focus:ring">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
              alt=""
            />
          </div>
          <div className="text-left w-full">
            <p className="font-semibold text-base text-black">{user.firstname} {user.lastname}</p>
            <p className="font-normal text-base text-black">{user.user_type}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SideBar;