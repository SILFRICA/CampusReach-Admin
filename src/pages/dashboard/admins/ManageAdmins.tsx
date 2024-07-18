import React, { MouseEvent, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ManageAdmins: React.FC = () => {
  const { userData } = useContext(AuthContext);
  const [filterSelected, setFilterSelected] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page

  // Flatten channels and sub_channels
  const AdminsData = userData.sub_admins.map((admin: any) => ({
    email: admin.email,
    channels: [
      ...admin.channels.map((channel: any) => ({
        name: channel.name,
        category: channel.type,
      })),
      ...admin.sub_channels.map((subChannel: any) => ({
        name: subChannel.name,
        category: subChannel.category,
      })),
    ],
  }));

  // Flattened data for table display
  const flattenedData = AdminsData.flatMap((admin: any) =>
    admin.channels.map((channel: any) => ({
      email: admin.email,
      name: channel.name,
      category: channel.category,
    }))
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(flattenedData.length / itemsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the items for the current page
  const currentAdmins = flattenedData.slice(startIndex, endIndex);

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

  const handleSelectedFilter = (e: MouseEvent<HTMLInputElement>) => {
    setFilterSelected(e.currentTarget.value);
  };

  const resetFilter = () => {
    setFilterSelected("all");
  };

  return (
    <section className="text-lg lg:text-xl min-h-full" id="mda">
      <h3 className="font-bold">View all admins</h3>
      <br />

      <div className="space-y-2">
        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Filter </span>
            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">
                {" "}
                {filterSelected} Selected{" "}
              </span>

              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4"
                onClick={() => resetFilter()}
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 border-t border-gray-200 p-4">
              <li>
                <label
                  htmlFor="FilterForEmail"
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="FilterForEmail"
                    name="filter"
                    value="email"
                    onClick={(e) => handleSelectedFilter(e)}
                    className="size-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {" "}
                    email address{" "}
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterForChannel"
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="FilterForChannel"
                    name="filter"
                    value="channel"
                    onClick={(e) => handleSelectedFilter(e)}
                    className="size-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {" "}
                    channel{" "}
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterForCategory"
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="FilterForCategory"
                    name="filter"
                    value="category"
                    onClick={(e) => handleSelectedFilter(e)}
                    className="size-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {" "}
                    category{" "}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </details>
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
                currentAdmins.map((admin: any, index: number) => (
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
                  <td
                    className="text-center text-xl text-teal-900"
                    colSpan={3}
                  >
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
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
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
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414 0z"
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
