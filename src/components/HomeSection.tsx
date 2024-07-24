import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  UsersIcon,
  BuildingOfficeIcon,
  NewspaperIcon,
} from "@heroicons/react/20/solid";
import Card from "./cards/Card";

interface PostStats {
  all: number;
  last_7_days: number;
  last_30_days: number;
}

const HomeSection: React.FC = () => {
  const { userData } = useContext(AuthContext);
  const amountOfPost: PostStats = userData.post_stats;
  const [postStat, setPostStat] = useState<number>(amountOfPost.all);

  const handlePostAmountFilter = (key: keyof PostStats) => {
    setPostStat(amountOfPost[key]);
  };

  const handleAmountOfChannels = (arr1: number[], arr2: number[]): number => {
    const validArr1 = Array.isArray(arr1) ? arr1 : [];
    const validArr2 = Array.isArray(arr2) ? arr2 : [];
    let total = validArr1.length > 0 ? validArr1.length : 0;
    total += validArr2.length > 0 ? validArr2.length : 0;
    return total;
  };

  const numberOfChannels: number = handleAmountOfChannels(
    userData.channel_managed,
    userData.subchannel_managed
  );

  return (
    <div id="home">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 text-[#003431]">
        <Card
          className="bg-white border border-l-4 border-l-teal-600"
          amount={numberOfChannels}
          icon={<BuildingOfficeIcon className="w-6 h-6" />}
          iconParentClass="bg-[#4dfbd9] rounded-full"
          title="Number of Channels"
          children={
            <span className="text-[#028374] font-medium text-sm hover:text-[#0c554d]">
              All
            </span>
          }
        />
        <Card
          className="bg-white border border-l-4 border-l-teal-600"
          amount={userData.user.campus_population}
          icon={<UsersIcon className="w-6 h-6" />}
          iconParentClass="bg-[#4dfbd9] rounded-full"
          title="Campus Population"
          children={
            <span className="text-[#028374] font-medium text-sm hover:text-[#0c554d]">
              All
            </span>
          }
        />
        <Card
          className="bg-white border border-l-4 border-l-teal-600"
          amount={postStat}
          icon={<NewspaperIcon className="w-6 h-6" />}
          iconParentClass="bg-[#4dfbd9] rounded-full"
          title="Number of Posts created"
          children={
            <div className="flex gap-2">
              <span
                className="text-[#028374] font-medium text-sm hover:text-[#0c554d] cursor-pointer"
                onClick={() => handlePostAmountFilter("all")}
              >
                All
              </span>
              |
              <span className="text-[#028374] font-medium text-sm hover:text-[#0c554d] cursor-pointer"
              onClick={() => handlePostAmountFilter("last_7_days")}
              >
                Last 7 Days
              </span>
              |
              <span className="text-[#028374] font-medium text-sm hover:text-[#0c554d] cursor-pointer"
              onClick={() => handlePostAmountFilter("last_30_days")}
              >
                Last 30 Days
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default HomeSection;
