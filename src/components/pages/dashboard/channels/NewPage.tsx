import React, { useState } from "react";
import { Channel, channelData } from "../channels/channelData";
import ArrowDownChannel from "@/assets/Arrow-downChannel.svg";
import Filter from "@/assets/Filter.svg";

const PAGE_SIZE = 5; // Define the number of rows per page

const NewChannel = () => {
    const [filteredChannels, setFilteredChannels] = useState<Channel[]>(channelData);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedFilter, setSelectedFilter] = useState<string>("All");

    // Handle filtering based on the dropdown
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedFilter(value);

        let filtered = channelData;
        if (value === "Pending") {
            filtered = channelData.filter((channel: { action: { message: string; }; }) => channel.action.message === "Resend");
        } else if (value === "Suspended") {
            filtered = channelData.filter((channel: { action: { suspend: string; }; }) => channel.action.suspend === "Suspend");
        }

        setFilteredChannels(filtered);
        setCurrentPage(1); // Reset to first page after filter change
    };

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    // Get the current page of data
    const paginatedChannels = filteredChannels.slice(startIndex, endIndex);

    // Handle Next page button
    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredChannels.length / PAGE_SIZE)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Handle Previous page button
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="flex flex-col h-screen p-6">
            <div className="flex justify-between items-center w-full mb-6">
                <h1 className="text-[16px] font-medium">Channel List:</h1>

                {/* Dropdown */}
                <div className="relative flex items-center flex-1">
                    <div className="relative">
                        <select
                            id="options"
                            name="options"
                            className="p-2 pr-10 focus:outline-none appearance-none text-[16px] font-bold cursor-pointer w-auto"
                            style={{ width: 'auto', minWidth: 'fit-content' }}
                            value={selectedFilter}
                            onChange={handleFilterChange}
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                        <img
                            src={ArrowDownChannel}
                            alt="down-arrow"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        />
                    </div>
                </div>

                <button className="bg-[#03CF79] hover:bg-[#03cf7af7] text-white font-bold py-2 px-4">
                    Create New Channel
                </button>
            </div>

            {/* Search Input */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <input
                        placeholder="Search by channel name, category or email"
                        className="border-black rounded w-full p-4 border-[1.5px] placeholder-black pr-10 focus:outline-none appearance-none"
                        type="search"
                        id="search"
                    />
                    <img
                        src={Filter}
                        alt=""
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                </div>
            </div>

            {/* Table Header */}
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-[#d4f7de]">
                        <th className="border p-6 text-left">Channel Name</th>
                        <th className="border p-6 text-left">Email</th>
                        <th className="border p-6 text-left">Category</th>
                        <th className="border p-6 text-left">Action</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {paginatedChannels.map((channel, index) => (
                        <tr key={index} className="border">
                            <td className="border p-6">{channel.name}</td>
                            <td className="border p-6">
                                <a href={`mailto:${channel.email}`} className="text-blue-500">
                                    {channel.email}
                                </a>
                            </td>
                            <td className="border p-6">{channel.category}</td>
                            <td className="border p-6">
                                <div className="flex justify-center items-center space-x-2">
                                    <button
                                        className="bg-blue-500 text-white py-1 px-4 w-28 text-center"
                                    >
                                        {channel.action.message}
                                    </button>

                                    <button
                                        className={`${channel.action.suspend === "Delete" ? "bg-red-500" : "bg-yellow-500"} text-white py-1 px-4 w-28 text-center`}
                                    >
                                        {channel.action.suspend}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-end gap-16 mt-6">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`bg-transparent text-black font-bold py-2 px-4 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                >
                    Back
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(filteredChannels.length / PAGE_SIZE)}
                    className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${currentPage === Math.ceil(filteredChannels.length / PAGE_SIZE) ? 'cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default NewChannel;