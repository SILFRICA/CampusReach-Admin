import React, { useState } from "react";
import { createPortal } from 'react-dom';
import Greeting from '@/components/Greeting'
import CreateChannelModal from "@/components/modals/channels/Creation";
import HomeSection from "./section";
import ManageAdmins from "../admins/ManageAdmins";
import ChannelSection from "../channels/ChannelSection";

const HomePage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
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
        {createPortal(
        <CreateChannelModal open={isOpen} onOpenChange={setIsOpen} />,
        document.body
    )}
    </div>
  )
}

export default HomePage
