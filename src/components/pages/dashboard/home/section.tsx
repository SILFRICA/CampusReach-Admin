import React, { useState } from "react";
import Card from "@/components/cards/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HomeDataResponse } from "./response";

interface PostStats {
  all: number;
  last_7_days: number;
  last_30_days: number;
}

interface HomeDataType {
  data: HomeDataResponse;
}

const HomeSection: React.FC<HomeDataType> = ({ data }) => {
  const { post_stats, activities, campus_population } = data;

  const [postStat, setPostStat] = useState<number>(post_stats.all);

  // Handle the post statistics filter
  const handlePostAmountFilter = (value: keyof PostStats) => {
    setPostStat(post_stats[value]);
  };

  return (
    <div id="home">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 text-[#003431]">
        {/* Posts Created Card */}
        <Card
          className="bg-[#E8DF11]"
          amount={postStat}
          title="Posts Created"
        >
          <Select
            name="post_stat"
            onValueChange={handlePostAmountFilter}
          >
            <SelectTrigger
              className="w-auto min-w-[120px] text-black font-medium text-xs flex items-center focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 appearance-none bg-transparent border-none focus:border-none focus-within:border-none focus-visible:none"
            >
              <SelectValue placeholder="All" />
            </SelectTrigger>


            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Active Channels Card */}
        <Card
          className="bg-[#03CF79]"
          amount={activities.total_posts}
          title="Active Channels"
        >
          <Select name="channel_activities">
            <SelectTrigger className="w-auto min-w-[120px] text-black font-medium text-xs flex items-center focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 appearance-none bg-transparent border-none focus:border-none focus-within:border-none focus-visible:none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Campus Population Card */}
        <Card
          className="bg-[#FF2055]"
          amount={campus_population}
          title="Campus Population"
        >
          <Select name="campus">
            <SelectTrigger className="w-auto min-w-[120px] text-black font-medium text-xs flex items-center focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 appearance-none bg-transparent border-none focus:border-none focus-within:border-none focus-visible:none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="non">Non-student</SelectItem>
            </SelectContent>
          </Select>
        </Card>
      </div>
    </div>
  );
};

export default HomeSection;
