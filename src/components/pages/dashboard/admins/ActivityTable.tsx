import React, { useState } from "react";
import { Activity } from "../channels/ActivityTableData";

interface ActivityTableProps {
    data: Activity[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ data }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    // Split data into two parts
    const visibleData = data.slice(0, 5); // First 5 items
    const modalData = data.slice(); // Remaining items

    return (
        <div>
            {/* Table */}
            <div className="overflow-x-auto border border-gray-200">
                <table className="w-full border-collapse bg-white text-left text-sm">
                    <thead className="bg-[#03cf7a7b] border-2 border-[#03CF79] text-black">
                        <tr>
                            <th className="px-6 py-3 border-b font-medium">Channel Name</th>
                            <th className="px-6 py-3 border-b font-medium">Reach</th>
                            <th className="px-6 py-3 border-b font-medium">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleData.map((activity, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 border-b text-gray-700"
                            >
                                <td className="px-6 py-3">{activity.channelName}</td>
                                <td className="px-6 py-3 underline tracking-wider">
                                    {activity.reach}
                                </td>
                                <td className="px-6 py-3">{activity.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View More Button */}
            {modalData.length > 0 && (
                <div
                    className="flex justify-end"
                    onClick={toggleModal}
                >
                    <p className="text-[#03CF79] py-3 w-fit text-right cursor-pointer hover:text-[#03cf7a9d]">View More</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-lg shadow-lg p-6 relative px-8">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            onClick={toggleModal}
                        >
                            ✕
                        </button>

                        {/* Modal Table */}
                        <div className="overflow-x-auto border border-gray-200">
                            <table className="w-full border-collapse bg-white text-left text-sm">
                                <thead className="bg-[#03cf7a7b] border-2 border-[#03CF79] text-black">
                                    <tr>
                                        <th className="px-6 py-3 border-b font-medium">
                                            Channel Name
                                        </th>
                                        <th className="px-6 py-3 border-b font-medium">Reach</th>
                                        <th className="px-6 py-3 border-b font-medium">
                                            Timestamp
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modalData.map((activity, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 border-b text-gray-700"
                                        >
                                            <td className="px-6 py-3">{activity.channelName}</td>
                                            <td className="px-6 py-3 underline tracking-wider">
                                                {activity.reach}
                                            </td>
                                            <td className="px-6 py-3">{activity.timestamp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityTable;
