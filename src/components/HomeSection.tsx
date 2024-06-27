import React from "react";
import { UsersIcon } from "@heroicons/react/20/solid";

const HomeSection: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 text-[#003431]">
        <div className="bg-white rounded-md border-l-4 border-l-teal-600 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">2</div>
              </div>
              <div className="text-sm font-medium">Number of Channels</div>
            </div>
          </div>

          <a
            href="/gebruikers"
            className="text-[#028374] font-medium text-sm hover:text-[#0c554d]"
          >
            View
          </a>
        </div>
        <div className="bg-white rounded-md border-l-4 border-l-teal-600 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex items-center mb-1 gap-2">
                <div className="text-2xl font-semibold">100</div>
                <div className="p-1 rounded bg-[#4dfbd9] rounded-full">
                  <UsersIcon className="w-6 h-6"/>
                </div>
              </div>
              <div className="text-sm font-medium">Campus Population</div>
            </div>
          </div>
          <a
            href="/dierenartsen"
            className="text-[#028374] font-medium text-sm hover:text-[#0c554d]"
          >
            View
          </a>
        </div>
        <div className="bg-white rounded-md border-l-4 border-l-teal-600 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-semibold mb-1">100</div>
              <div className="text-sm font-medium">Number of Posts created</div>
            </div>
          </div>
          <a
            href=""
            className="text-[#028374] font-medium text-sm hover:text-[#0c554d]"
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
