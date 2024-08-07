import React from "react";
import { useRef } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ChannelSection from "./dashboard/channel/ChannelSection";
import ManageAdmins from "./dashboard/admins/ManageAdmins";
import HomeSection from "../components/HomeSection";

const PageLayout: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sidebarMenuRef = useRef<HTMLDivElement>(null);
  const sidebarOverlayRef = useRef<HTMLDivElement>(null);

  const handleSideBar = () => {
    if (mainRef.current) {
      mainRef.current.classList.add("active");
    }
    if (sidebarOverlayRef.current) {
      sidebarOverlayRef.current.classList.add("hidden");
    }
    if (sidebarMenuRef.current) {
      sidebarMenuRef.current.classList.add("-translate-x-full");
    }
  };

  const handleSideBarToggle = () => {
    if (mainRef.current) {
      mainRef.current.classList.toggle("active");
    }
    if (sidebarOverlayRef.current) {
      sidebarOverlayRef.current.classList.toggle("hidden");
    }
    if (sidebarMenuRef.current) {
      sidebarMenuRef.current.classList.toggle("-translate-x-full");
    }
  };
  return (
    <div className="text-[#003431] font-inter">
      <SideBar ref={sidebarMenuRef} />
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
        onClick={handleSideBar}
        ref={sidebarOverlayRef}
      ></div>
      <main
        className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-white min-h-screen transition-all main"
        ref={mainRef}
      >
        <NavBar sidebarToggle={handleSideBarToggle} />
        <div className="p-6">
          <HomeSection />
          <br />
          <ManageAdmins />
          <br />
          <ChannelSection />
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
