// ManageChannel.tsx

import React, { useState } from "react";
import { channelData, Channel } from "../channels/channelData";

const ManageChannel: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>(channelData);

  const toggleStatus = (id: number) => {
    setChannels((prevChannels) =>
      prevChannels.map((channel) =>
        channel.id === id
          ? { ...channel, status: channel.status === "Active" ? "Inactive" : "Active" }
          : channel
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Channels</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-3 text-left">ID</th>
            <th className="border-b-2 p-3 text-left">Name</th>
            <th className="border-b-2 p-3 text-left">Status</th>
            <th className="border-b-2 p-3 text-left">Subscribers</th>
            <th className="border-b-2 p-3 text-left">Created At</th>
            <th className="border-b-2 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.id} className="hover:bg-gray-100">
              <td className="border-b p-3">{channel.id}</td>
              <td className="border-b p-3">{channel.name}</td>
              <td className="border-b p-3">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-white ${
                    channel.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {channel.status}
                </span>
              </td>
              <td className="border-b p-3">{channel.subscribers}</td>
              <td className="border-b p-3">{channel.createdAt}</td>
              <td className="border-b p-3">
                <button
                  onClick={() => toggleStatus(channel.id)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Toggle Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageChannel;
