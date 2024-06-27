import React from "react";
import {
  UsersIcon,
  BuildingOfficeIcon,
  NewspaperIcon,
} from "@heroicons/react/20/solid";
import Card from "./cards/Card";

const HomeSection: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 text-[#003431]">
        <Card
          className="bg-white border border-l-4 border-l-teal-600"
          amount={10}
          icon={<BuildingOfficeIcon className="w-6 h-6" />}
          iconParentClass="bg-[#4dfbd9] rounded-full"
          title="Number of Channels"
          url="/view"
          urlTitle="View"
        />
        <Card
          className="bg-white border border-l-4 border-l-teal-600"
          amount={10000}
          icon={<UsersIcon className="w-6 h-6" />}
          iconParentClass="bg-[#4dfbd9] rounded-full"
          title="Campus Population"
          url="/view"
          urlTitle="View"
        />
        <Card
          className="bg-white border border-l-4 border-l-teal-600"
          amount={100}
          icon={<NewspaperIcon className="w-6 h-6" />}
          iconParentClass="bg-[#4dfbd9] rounded-full"
          title="Number of Posts created"
          url="/view"
          urlTitle="View"
        />
      </div>
    </div>
  );
};

export default HomeSection;
