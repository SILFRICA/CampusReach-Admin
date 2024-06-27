import React from "react";

const HomeSection: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 text-white">
        <div className="bg-[#00a490] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
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
        <div className="bg-[#00a490] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">100</div>
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                  +30%
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
        <div className="bg-[#00a490] rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
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
