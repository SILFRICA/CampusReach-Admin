import React, { useState } from "react";

const ChannelSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("excel");
  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <section className="text-lg lg:text-xl min-h-screen" id="cta">
      <h3 className="font-bold">Super Action</h3>
      <br />

      <div>
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>

          <select id="Tab" className="w-full rounded-md border-teal-200">
            <option onSelect={() => handleActiveTab("channel")}>
              Create Channel
            </option>
            <option selected onSelect={() => handleActiveTab("excel")}>
              Import Excel Sheet
            </option>
          </select>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              <a
                href="#download-mobile-app"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
                  activeTab === "channel"
                    ? "border-teal-300 text-teal-700"
                    : "border-transparent hover:border-teal-300 hover:text-teal-700"
                } px-1 pb-4 text-sm font-medium text-teal-500 transition-colors`}
                onClick={() => handleActiveTab("channel")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                  />
                </svg>
                Create Channel
              </a>

              <a
                href="#excel-sheet-4-bulk-data"
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
                  activeTab === "excel"
                    ? "border-teal-300 text-teal-700"
                    : "border-transparent hover:border-teal-300 hover:text-teal-700"
                } px-1 pb-4 text-sm font-medium text-teal-500 transition-colors`}
                onClick={() => handleActiveTab("excel")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                Import Excel Sheet
              </a>
            </nav>
          </div>
        </div>
      </div>
      <br />
      <div className="h-48 flex justify-center items-center border border-gray-300 rounded-md text-center transition-colors hover:bg-gray-50">
        {activeTab === "channel" ? (
          <small className="text-red-600">
            ⚠ Kindly use our mobile app to proceed with this action!
          </small>
        ) : (
          <div className="flex flex-col gap-3 justify-center">
            <small className="text-yellow-600 text-xs lg:text-base">Create Bulk channels ranging from 5 above!</small>
            <div className="w-fit p-2 border border-gray-300 rounded-md flex flex-col md:flex-row gap-2 items-center">
              <small className="text-red-600 text-xs lg:text-base">
                ⚠ Please use our template to fill your data.
              </small>
              <a href="/favicon.svg" type="download" className="underline">
                download here!
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap cursor-pointer w-full">
              <label htmlFor="excelSheet">Upload Sheet</label>
              <input
                type="file"
                name="excel_sheet"
                id="excelSheet"
                className="p-2 bg-white rounded-md cursor-grab shadow-md shadow-teal-300/10"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChannelSection;
