import React from "react";
import { useState } from "react";
import { useRef } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";

const PageLayout: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sidebarMenuRef = useRef<HTMLDivElement>(null);
  const sidebarOverlayRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSideBar = () => {
    setIsSidebarOpen(false);
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
    setIsSidebarOpen((prev: boolean) => !prev);
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
      <SideBar ref={sidebarMenuRef} isOpen={isSidebarOpen} />
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
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
