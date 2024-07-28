import React, { useState, useContext, ChangeEvent } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ChannelTable, AdminData, AdminProps } from "./AdminsChannelsTypes";

const ManageAdmins: React.FC = () => {
  const { userData } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const itemsPerPage = 5; // Number of items to show per page

  // Flatten channels and sub_channels
  const AdminsData: ChannelTable[] = userData.sub_admins.map(
    (admin: AdminProps) => ({
      email: admin.email,
      channels: [
        ...admin.channels.map((channel) => ({
          name: channel.name,
          category: channel.type,
        })),
        ...admin.sub_channels.map((subChannel) => ({
          name: subChannel.name,
          category: subChannel.category,
        })),
      ],
    })
  );

  // Flattened data for table display
  const flattenedData: AdminData[] = AdminsData.flatMap((admin) =>
    admin.channels.map((channel: AdminData) => ({
      email: admin.email,
      name: channel.name,
      category: channel.category,
    }))
  );

  // Filter data based on the search query and selected category
  const filteredData = flattenedData.filter(
    (admin) =>
      (admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory ? admin.category === selectedCategory : true)
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the items for the current page
  const currentAdmins = filteredData.slice(startIndex, endIndex);

  // Handlers for pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page whenever the search query changes
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to the first page whenever the category changes
  };

  return (
    <section className="text-lg lg:text-xl min-h-full" id="mda">
      <h3 className="font-bold">View all admins</h3>
      <br />

      <div className="flex gap-3 items-center h-12 border">
        {/* Add the search field here */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="🔍 Search by email or channel name"
          className="w-2/3 h-full px-4 py-2 border border-gray-300 focus-within:outline-teal-500 rounded-lg"
        />
      {/* filter based field here */}
      <select
        value={selectedCategory ?? ""}
        onChange={handleCategoryChange}
        className="w-1/3 h-full px-4 py-2 border border-gray-300 focus-within:outline-teal-500 rounded-lg"
      >
        <option value="">All Categories</option>
        <option value="Administration">Administration</option>
        <option value="Faculty">Faculty</option>
        <option value="Department">Department</option>
        <option value="School Official">School Official</option>
        <option value="Association">Association</option>
        <option value="School Partner">School Partner</option>
      </select>
      </div>

      <br />

      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Email Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Channel Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Category
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentAdmins.length > 0 ? (
                currentAdmins.map((admin, index: number) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {admin.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {admin.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {admin.category}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center text-xl text-teal-900" colSpan={3}>
                    No data available!😥
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-gray-50 ${
                currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
            >
              <span className="sr-only">Previous Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 010-1.414l4-4a1 1 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <p className="text-xs text-gray-900">
              {currentPage}
              <span className="mx-0.25">/</span>
              {totalPages}
            </p>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-gray-50 ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageAdmins;
