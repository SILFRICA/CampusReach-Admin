import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import {
  UsersIcon,
  BuildingOfficeIcon,
  NewspaperIcon,
} from "@heroicons/react/20/solid";
import Card from "./cards/Card";

const HomeSection: React.FC = () => {
  const { userData } = useContext(AuthContext);
  const handleAmountOfChannels = (arr1: number[], arr2: number[]): number => {
    const validArr1 = Array.isArray(arr1) ? arr1 : [];
    const validArr2 = Array.isArray(arr2) ? arr2 : [];
    let total = validArr1.length > 0 ? validArr1.length : 0;
    total += validArr2.length > 0 ? validArr2.length : 0;
    return total;
  };
  
  const numberOfChannels: number = handleAmountOfChannels(userData.channel_managed, userData.subchannel_managed);
  
  return (
    <div id="home">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 text-[#003431]">
        <Card
          className="bg-white border border-l-4 border-l-teal-600"
          amount={numberOfChannels}
          icon={<BuildingOfficeIcon className="w-6 h-6" />}
          iconParentClass="bg-[#4dfbd9] rounded-full"
          title="Number of Channels"
          url="#filterChannel"
          urlTitle="All | Faculty"
        />
        <Card
          className="bg-white border border-l-4 border-l-teal-600"
          amount={userData.user.campus_population}
          icon={<UsersIcon className="w-6 h-6" />}
          iconParentClass="bg-[#4dfbd9] rounded-full"
          title="Campus Population"
          url="#filterPopulation"
          urlTitle="All | Student | Others"
        />
        <Card
          className="bg-white border border-l-4 border-l-teal-600"
          amount={userData.user.amount_of_posts}
          icon={<NewspaperIcon className="w-6 h-6" />}
          iconParentClass="bg-[#4dfbd9] rounded-full"
          title="Number of Posts created"
          url="#filterPosts"
          urlTitle="All | Last 7 days | Last 30 days"
        />
      </div>
    </div>
  );
};

export default HomeSection;
