import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Card from "./cards/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PostStats {
  all: number;
  last_7_days: number;
  last_30_days: number;
}

const HomeSection: React.FC = () => {
  const { userData } = useContext(AuthContext);
  const amountOfPost: PostStats = userData.post_stats;
  const [postStat, setPostStat] = useState<number>(amountOfPost.all);

  const handlePostAmountFilter = (value: keyof PostStats) => {
    setPostStat(amountOfPost[value]);
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
    userData.subchannel_managed,
  );

  return (
    <div id="home">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 text-[#003431]">
        <Card
          className="bg-[#E8DF11]"
          amount={postStat}
          title="Posts created"
          children={
            <>
              <Select
                name="post_stat"
                onValueChange={handlePostAmountFilter}
                >
                <SelectTrigger className="w-fit text-black font-medium text-xs focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 appearance-none bg-transparent border-none focus:border-none focus-within:border-none focus-visible:none" >
                  <SelectValue placeholder="All"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="last_7_days">Last 7 days</SelectItem>
                  <SelectItem value="last_30_days">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </>
          }
        />
        <Card
          className="bg-[#03CF79]"
          amount={numberOfChannels}
          title="Active channels"
          children={
            <>
              <Select
                name="channel_activities"
                >
                <SelectTrigger className="w-fit text-black font-medium text-xs focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 appearance-none bg-transparent border-none focus:border-none focus-within:border-none focus-visible:none" >
                  <SelectValue placeholder="All"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </>
          }
        />
        <Card
          className="bg-[#FF2055]"
          amount={userData.user.campus_population}
          title="Campus Population"
          children={
            <>
              <Select
                name="campus"
                >
                <SelectTrigger className="w-fit text-black font-medium text-xs focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 appearance-none bg-transparent border-none focus:border-none focus-within:border-none focus-visible:none" >
                  <SelectValue placeholder="All"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="non">Non-student</SelectItem>
                </SelectContent>
              </Select>
            </>
          }
        />
      </div>
    </div>
  );
};

export default HomeSection;
