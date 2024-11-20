import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { pendingChannelsData } from "../channels/pendingChannelData";
import DeleteModal from "@/components/modals/actionPrompts/DeleteModal";
import PendingChannels from "@/components/pages/dashboard/admins/PendingChannelData";
import ActivityTable from "@/components/pages/dashboard/admins/ActivityTable";
import { activityData } from "../channels/ActivityTableData";
import axios from "axios";
import apiUrl from "@/data/axios";

const ManageAdmins: React.FC = () => {
  const { userData } = useContext(AuthContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeModalData, setActiveModalData] = useState<string>("");

  const API_URL = apiUrl("production");

  const pendingTableHeadings = [
    "Email Address",
    "Channel Name",
    "Category",
    "Actions",
  ];

  const handleResend = async (email: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/channel/resend`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Invitation resent successfully.");
      } else {
        alert("Failed to resend invitation.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while resending the invitation.");
    }
  };

  const openDeleteModal = (channelName: string) => {
    setActiveModalData(channelName);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = async (channelName: string) => {
    try {
      const response = await axios.delete(`${API_URL}/api/channel/${channelName}`);
      if (response.status === 200) {
        alert(`Deleted channel ${channelName} successfully.`);
        closeDeleteModal();
      } else {
        alert(`Failed to delete channel ${channelName}.`);
      }
    } catch (error) {
      console.error(error);
      alert(`An error occurred while deleting channel ${channelName}.`);
    }
  };

  return (
    <section className="text-base min-h-full" id="mda">
      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-4">Activity Table</h4>
        <ActivityTable data={activityData} />
      </div>

      {/* Pending Channels */}
      <PendingChannels
        pendingChannels={pendingChannelsData}
        onResend={handleResend}
        onDelete={openDeleteModal}
        headings={pendingTableHeadings}
      />

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => handleDelete(activeModalData)}
          itemId={activeModalData}
          children={undefined}
        />
      )}
    </section>
  );
};

export default ManageAdmins;