import React, { useState } from "react";
import AdminTable from "@/components/tables/AdminTable";

interface PendingChannel {
  email: string;
  channelName: string;
  category: string;
}

interface PendingChannelsProps {
  pendingChannels: PendingChannel[];
  onResend: (email: string) => void;
  onDelete: (channelName: string) => void;
  headings: string[];
}

const PendingChannels: React.FC<PendingChannelsProps> = ({
  pendingChannels,
  onResend,
  onDelete,
  headings,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // Split data into visible and modal data
  const visibleChannels = pendingChannels.slice(0, 5); // First 5 items
  const modalChannels = pendingChannels.slice(); // Remaining items

  return (
    <>
      <h4 className="font-semibold text-base py-3">Pending Channels</h4>
      <div className="rounded-sm border border-gray-200">
        <div className="overflow-y-auto max-h-[480px] rounded-sm">
          {/* Table for Visible Data */}
          <AdminTable headers={headings}>
            {visibleChannels.map((channel, index) => (
              <tr key={index} className="hover:bg-gray-100 text-sm">
                <td className="border border-gray-200 px-6 py-3">
                  {channel.email}
                </td>
                <td className="border border-gray-200 px-6 py-3">
                  {channel.channelName}
                </td>
                <td className="border border-gray-200 px-6 py-3">
                  {channel.category}
                </td>
                <td className="border border-gray-200 px-6 py-3">
                  <button
                    onClick={() => onResend(channel.email)}
                    className="mr-4 text-black bg-green-400 px-4 py-1 hover:text-white"
                  >
                    Resend
                  </button>
                  <button
                    onClick={() => onDelete(channel.channelName)}
                    className="text-black bg-red-600 px-4 py-1 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </AdminTable>
        </div>
      </div>

      {/* View More Button */}
      {modalChannels.length > 0 && (
        <div className="flex justify-end">
          <p
            className="text-[#03CF79] py-3 w-fit text-right cursor-pointer hover:text-[#03cf7a9d]"
            onClick={toggleModal}
          >
            View More
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={toggleModal}
            >
              ✕
            </button>

            <h4 className="font-semibold text-base mb-4">All Pending Channels</h4>

            {/* Table for Modal Data */}
            <div className="overflow-y-auto max-h-[480px] rounded-sm border border-gray-200">
              <AdminTable headers={headings}>
                {modalChannels.map((channel, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-sm">
                    <td className="border border-gray-200 px-6 py-3">
                      {channel.email}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      {channel.channelName}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      {channel.category}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      <button
                        onClick={() => onResend(channel.email)}
                        className="mr-4 text-black bg-green-400 px-4 py-1 hover:text-white"
                      >
                        Resend
                      </button>
                      <button
                        onClick={() => onDelete(channel.channelName)}
                        className="text-black bg-red-600 px-4 py-1 hover:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </AdminTable>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingChannels;
