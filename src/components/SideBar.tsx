import React, { forwardRef, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LogoWithText from "../assets/logo_with_text.png";
import SideBarData from "../data/sidebar.json";
import { Link } from "react-router-dom";
// import { truncateString } from "../helpers/TruncateString";

const SideBar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
//   const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<string>("Home");


  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  }

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

        {SideBarData &&
          SideBarData.name.map((nav, index) => (
            <li className="mb-1 group h-[56px] text-center" key={index}>
              <Link
                to={nav.url}
                className={`${activeTab === nav.title ? 'text-[#03CF79]': 'text-black'}`}
                onClick={() => handleActiveTab(nav.title)}
              >
                <span className="text-xl font-semibold">{nav.title}</span>
              </Link>
            </li>
          ))}
      </ul>
      {props && <ul>{props.children}</ul>}

      <a
      className="w-[199px] h-[56px] bg-[#03CF79] text-white flex justify-center items-center text-xl font-semibold"
      href="#">
        Find channel
      </a>

      <br />
      <div className="flex  w-[201px] h-12 gap-4 justify-evenly">
        <div className="w-12 bg-[#D9D9D9] rounded-full focus:outline-none focus:ring">
            <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                alt=""
            />
        </div>
        <div className="text-left w-full">
            <p className="font-semibold text-base text-black">{userData.user.firstname}{" "}{userData.user.lastname}</p>
            <p className="font-normal text-base text-black">{userData.user.user_type}</p>
        </div>
      </div>
      </div>
    </div>
  );
});

export default SideBar;
