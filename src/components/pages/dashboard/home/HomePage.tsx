import React, { useEffect, useState, useContext } from "react";
import { createPortal } from 'react-dom';
import Greeting from '@/components/Greeting'
import CreateChannelModal from "@/components/modals/channels/Creation";
import HomeSection from "./section";
import ManageAdmins from "../admins/ManageAdmins";
import ChannelSection from "../channels/ChannelSection";
import { AuthContext } from "@/context/AuthContext";
import { HomeDataResponse } from "./response";
import apiUrl from "@/data/axios";
import axios from "axios";

const HomePage: React.FC = () => {
    const { userData } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false)
    const [homeData, setHomeData] = useState<HomeDataResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = apiUrl("production");
              const response = await axios.get(`${API_URL}/api/cra/${userData.user.id}/home`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userData.token}`
                }});

              if (response.status !== 200) {
                throw new Error('Failed to get');
              }

              const data = await response.data.data;
              console.log(data);
              setHomeData(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                      // Server responded with a status other than 2xx
                      console.error("Process failed. Please try again.");
                    } else if (error.request) {
                      // No response was received from the server
                      alert('Network error');
                      console.error(
                        "Network error. Please check your connection and try again."
                      );
                    } else {
                      // Something else happened while setting up the request
                      alert('unexpected error')
                      console.error("An unexpected error occurred. Please try again.");
                    }
                  } else {
                    // Non-Axios error
                    alert('something went wrong')
                    console.error("An unexpected error occurred. Please try again.");
                  }
                  console.error("fetch data error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
      }, [userData.user.id, userData.token]);

      if (loading) {
        return <div>Loading...</div>;
      }

  return (
    <div className="p-6">
        <div className="w-full flex justify-between">
            <Greeting/>
            <p className="w-[169px] h-[36px] -mt-2 flex items-center justify-center bg-[#03CF79] text-white cursor-pointer" onClick={() => setIsOpen(true)}>
                Add channel
            </p>
        </div>
        <br />
        {homeData && (
        <>
          <HomeSection data={homeData} />
          <br />
          <ManageAdmins data={homeData} />
          <br />
        </>
      )}
      <ChannelSection />
        {createPortal(
        <CreateChannelModal open={isOpen} data={} onOpenChange={setIsOpen} />,
        document.body
    )}
    </div>
  )
}

export default HomePage
