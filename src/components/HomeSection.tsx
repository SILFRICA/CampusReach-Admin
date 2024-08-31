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

  const handlePostAmountFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index: keyof PostStats = e.target.value;
    setPostStat(amountOfPost[index]);
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
          className="bg-[#E8DF11]"
          amount={postStat}
          title="Posts created"
          children={
            <select
            defaultValue={postStat}
            className="w-[68px] text-black font-medium text-xs appearance-none bg-transparent"
            onChange={(e) => handlePostAmountFilter(e)}
            >
              <option value="all">All</option>
              <option value="last_7_days">Last 7 days</option>
              <option value="last_30_days">Last 30 days</option>
            </select>
          }
        />
        <Card
          className="bg-[#03CF79]"
          amount={numberOfChannels}
          title="Active channels"
          children={
            <select className="w-[68px] text-black font-medium text-xs appearance-none bg-transparent">
              <option value="all">All</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          }
        />
        <Card
          className="bg-[#FF2055]"
          amount={userData.user.campus_population}
          title="Campus Population"
          children={
            <select className="w-[68px] text-black font-medium text-xs appearance-none bg-transparent">
              <option value="all">All</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          }
        />
      </div>
    </div>
  );
};

export default HomeSection;
