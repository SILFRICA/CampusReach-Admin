import React, { useEffect, useState, useContext } from "react";
import { createPortal } from 'react-dom';
import Greeting from '@/components/Greeting';
import CreateChannelModal from "@/components/modals/channels/Creation";
import HomeSection from "./section";
import ManageAdmins from "../admins/ManageAdmins";
import ChannelSection from "../channels/ChannelSection";
import { AuthContext } from "@/context/AuthContext"; // Import your AuthContext
import { HomeDataResponse } from "./response";
import apiUrl from "@/data/axios";
import axios from "axios";

const HomePage: React.FC = () => {
  const { userData } = useContext(AuthContext); // Directly use AuthContext
  const [isOpen, setIsOpen] = useState(false);
  const [homeData, setHomeData] = useState<HomeDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData) {
          throw new Error('User data is not available');
        }

        const API_URL = apiUrl("production");
        const response = await axios.get(`${API_URL}/api/cra/${userData.user.id}/home`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.user.token}`
          }
        });

        if (response.status !== 200) {
          throw new Error('Failed to get');
        }

        const data = response.data.data;
        console.log(data);
        setHomeData(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error("Process failed. Please try again.");
          } else if (error.request) {
            alert('Network error');
            console.error("Network error. Please check your connection and try again.");
          } else {
            alert('Unexpected error');
            console.error("An unexpected error occurred. Please try again.");
          }
        } else {
          alert('Something went wrong');
          console.error("An unexpected error occurred. Please try again.");
        }
        console.error("fetch data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="w-full flex justify-between">
        <Greeting />
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
        <CreateChannelModal open={isOpen} data={homeData} onOpenChange={setIsOpen} />,
        document.body
      )}
    </div>
  );
}

export default HomePage;
