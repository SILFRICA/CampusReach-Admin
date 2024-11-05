import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { activityData } from "../channels/ActivityTableData";
import { pendingChannelsData } from "../channels/pendingChannelData";
import AdminTable from "@/components/tables/AdminTable";
import DeleteModal from "@/components/modals/actionPrompts/DeleteModal";
import ViewMoreModal from "../channels/ViewMoreModal";
import axios from "axios";
import apiUrl from "@/data/axios";

const ManageAdmins: React.FC = () => {
  const { userData } = useContext(AuthContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeModalData, setActiveModalData] = useState<string>("");
  const [isViewMoreActivityOpen, setIsViewMoreActivityOpen] = useState(false);
  const [isViewMorePendingOpen, setIsViewMorePendingOpen] = useState(false);
  const [visibleActivityItems, setVisibleActivityItems] = useState(5);
  const [visiblePendingItems, setVisiblePendingItems] = useState(5);

  const API_URL = apiUrl("production");

  const openDeleteModal = (channelName: string) => {
    setActiveModalData(channelName);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const activityTableHeadings: string[] = [
    "Channel Name",
    "Reach",
    "Timestamp"
  ];

  const pendingTableHeadings: string[] = [
    "Email Address",
    "Channel Name",
    "Category",
    "Actions"
  ];

  const displayedActivities = activityData.slice(0, 5);
  const displayedPendingChannels = pendingChannelsData.slice(0, 5);

  const modalActivities = activityData.slice(0, visibleActivityItems);
  const modalPendingChannels = pendingChannelsData.slice(0, visiblePendingItems);

  const handleActivityScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      if (visibleActivityItems < activityData.length) {
        setVisibleActivityItems(prev => Math.min(prev + 5, activityData.length));
      }
    }
  };

  const handlePendingScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      if (visiblePendingItems < pendingChannelsData.length) {
        setVisiblePendingItems(prev => Math.min(prev + 5, pendingChannelsData.length));
      }
    }
  };

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

  const resetModalState = () => {
    setVisibleActivityItems(5);
    setVisiblePendingItems(5);
  };

  const handleModalClose = (type: 'activity' | 'pending') => {
    if (type === 'activity') {
      setIsViewMoreActivityOpen(false);
    } else {
      setIsViewMorePendingOpen(false);
    }
    resetModalState();
  };

  return (
    <section className="text-base min-h-full" id="mda">
        <h4 className="font-semibold text-base py-3">Activity</h4>
      {/* Activity Tale */}
      <div className="rounded-sm border border-gray-200 mb-6">
        <div className="overflow-y-auto max-h-[480px] rounded-sm">
          <AdminTable headers={activityTableHeadings}>
            <>
              {displayedActivities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-100 text-sm">
                  <td className="border border-gray-200 px-6 py-3 w-1/3">
                    {activity.channelName}
                  </td>
                  <td className="border border-gray-200 px-6 py-3 w-1/3">
                    {activity.reach}
                  </td>
                  <td className="border border-gray-200 px-6 py-3 w-1/3">
                    {activity.timestamp}
                  </td>
                </tr>
              ))}
            </>
          </AdminTable>
        </div>
      </div>
      {activityData.length > 5 && (
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsViewMoreActivityOpen(true)}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            View More
          </button>
        </div>
      )}

      {/* Pending Channels Table */}
        <h4 className="font-semibold text-base py-3">Pending Channels</h4>
      <div className="rounded-sm border border-gray-200">
        <div className="overflow-y-auto max-h-[480px] rounded-sm">
          <AdminTable headers={pendingTableHeadings}>
            <>
              {displayedPendingChannels.map((channel, index) => (
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
                      onClick={() => handleResend(channel.email)}
                      className="mr-4 text-blue-500 hover:text-blue-700"
                    >
                      Resend
                    </button>
                    <button
                      onClick={() => openDeleteModal(channel.channelName)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </>
          </AdminTable>
        </div>
      </div>
      {pendingChannelsData.length > 5 && (
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsViewMorePendingOpen(true)}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            View More
          </button>
        </div>
      )}

      {/* View More Modals */}
      <ViewMoreModal
        isOpen={isViewMoreActivityOpen}
        onClose={() => handleModalClose('activity')}
        data={modalActivities}
        type="activity"
        onScroll={handleActivityScroll}
      />

      <ViewMoreModal
        isOpen={isViewMorePendingOpen}
        onClose={() => handleModalClose('pending')}
        data={modalPendingChannels}
        type="pending"
        onDelete={handleDelete}
        onResend={handleResend}
        onScroll={handlePendingScroll}
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