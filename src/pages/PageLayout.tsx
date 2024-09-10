import React, { useState } from "react";
import { useRef } from "react";
import { createPortal } from 'react-dom';
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ChannelSection from "./dashboard/channel/ChannelSection";
import ManageAdmins from "./dashboard/admins/ManageAdmins";
import HomeSection from "../components/HomeSection";
import Greeting from "../components/Greeting";
import CreateChannelModal from "@/components/modals/channels/channel-creation-modal";
import { Dialog } from "@/components/ui/dialog";

const PageLayout: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
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
            <div className="w-full flex justify-between">
                <Greeting/>

                <p className="w-[169px] h-[36px] -mt-2 flex items-center justify-center bg-[#03CF79] text-white cursor-pointer" onClick={() => setIsOpen(true)}>
                    Add channel
                </p>
            </div>
            <br />
          <HomeSection />
          <br />
          <ManageAdmins />
          <br />
          <ChannelSection />
        </div>
      </main>
        {createPortal(
            <CreateChannelModal open={isOpen} onOpenChange={setIsOpen} />,
            document.body
        )}
    </div>
  );
};

export default PageLayout;
