import React, { useState, useContext, ChangeEvent } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  ChannelTable,
  AdminData,
  AdminProps,
  PendingAdmin,
  Channel,
  SubChannel,
  Channels,
} from "./AdminsChannelsTypes";
import AdminTable from "../../../components/tables/AdminTable";
import DeleteModal from "../../../components/modals/actionPrompts/DeleteModal";
import axios from "axios";
import apiUrl from "../../../data/axios";

interface SuspendChannelResponse {
  status: number;
}

const ManageAdmins: React.FC = () => {
  const { userData } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeModalData, setActiveModalData] = useState<number | string>("");
  const API_URL = apiUrl("production");

  const openDeleteModal = (data: number) => {
    setActiveModalData(data);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const tableHeadings: string[] = [
    "Email Address",
    "Channel Name",
    "Category",
    "Actions",
  ];
  const itemsPerPage = 5; // Number of items to show per page

  // Flatten channels and sub_channels
  const AdminsData: ChannelTable[] = userData.sub_admins.map(
    (admin: AdminProps) => ({
      admin_id: admin.id,
      email: admin.email,
      channels: [
        ...admin.channels.map((channel: Channel) => ({
          channel_id: channel.id,
          name: channel.name,
          category: channel.type,
          suspended_admins: channel.suspended_admins,
        })),
        ...admin.sub_channels.map((subChannel: SubChannel) => ({
          sub_channel_id: subChannel.id,
          name: subChannel.name,
          category: subChannel.category,
        })),
      ],
    }),
  );

  // Add pending admins to the flattened data
  const pendingAdmins: PendingAdmin[] = userData.pending_admins;

  const isPendingAdmin = (
    c_id: number | null,
    sc_id: number | null,
  ): boolean => {
    let pendingExist = false;
    pendingAdmins.forEach((pending) => {
      if (
        pending.sub_channel_id == sc_id &&
        pending.email !== null &&
        pending.channel_id !== c_id
      ) {
        pendingExist = true;
        return pendingExist;
      }
    });

    return pendingExist;
  };

  // Flattened data for table display
  const flattenedData: AdminData[] = AdminsData.flatMap((admin) =>
    admin.channels.map((channel: Channels) => ({
      channel_id: channel.channel_id,
      sub_channel_id: channel.sub_channel_id,
      email: admin.email,
      name: channel.name,
      category: channel.category,
      suspended_admins: channel.suspended_admins,
      id: admin.admin_id,
    })),
  );

  // Filter data based on the search query and selected category
  const filteredData = flattenedData.filter(
    (admin) =>
      (admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory ? admin.category === selectedCategory : true),
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

  const resendInvite = async (
    email: string,
    channelId: number | null,
    subChannelId: number | null
  ) => {
    try {
      const response = await axios.post(`${API_URL}/api/admin/resend-invite`, {
        email,
        channelId,
        subChannelId,
      });
      if (response.status === 200) {
        alert(`Invite resent to ${email}.`);
      } else {
        alert(`Failed to resend invite to ${email}.`);
      }
    } catch (error) {
      console.error(error);
      alert(`An error occurred while resending invite to ${email}.`);
    }
  };
  
// to suspend subchannel or not
  const handleSuspendChannel = async ([user_id, sub_channel_id]: [number, number]): Promise<void> => {
    try {
      const response: SuspendChannelResponse = await axios.post(`${API_URL}/api/subchanne/suspension`, {
        user_id,           // Include user_id
        sub_channel_id,    // Include sub_channel_id
      }, { headers: {
        'Authorization': `Bearer ${userData.token}`
      }});
  
      if (response.status === 200) {
        alert("The channel has been suspended.");
        // Refresh data if necessary
      } else {
        alert("Failed to suspend channel");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while suspending channel");
    }
  };

  const handleUnsuspendChannel = async ([user_id, sub_channel_id]: [number, number]): Promise<void> => {
    try {
      const response: SuspendChannelResponse = await axios.post(`${API_URL}/api/subchanne/suspension`, {
        user_id,           // Include user_id
        sub_channel_id,    // Include sub_channel_id
      }, { headers: {
        'Authorization': `Bearer ${userData.token}`
      }});
  
      if (response.status === 200) {
        alert("The channel has been suspended.");
        // Refresh data if necessary
      } else {
        alert("Failed to suspend channel");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while suspending channel");
    }
  };

  const handleDelete = async (channelId: number | string) => {
    try {
      const response = await axios.delete(`${API_URL}/api/channel/${channelId}`);
      if (response.status === 200) {
        alert(`Deleted channel ${channelId} successfully.`);
        // You can refresh data here to update the UI after deletion
      } else {
        alert(`Failed to delete channel ${channelId}.`);
      }
    } catch (error) {
      console.error(error);
      alert(`An error occurred while deleting channel ${channelId}.`);
    }
  };

  const handleMessage = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className="text-lg lg:text-xl min-h-full" id="mda">
      <h3 className="font-semibold text-xl text-black">View all admins</h3>
      <br />

      <div className="flex gap-3 items-center h-12">
        {/* Add the search field here */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="🔍 Search by email or channel name"
          className="w-2/3 h-full px-4 py-2 border border-[#03CF79] focus-within:outline-teal-500 bg-[#DFF9EE] rounded-sm"
        />
        {/* filter based field here */}
        <select
          value={selectedCategory ?? ""}
          onChange={handleCategoryChange}
          className="w-1/3 h-full px-4 py-2 border border-[#03CF79] focus-within:outline-teal-500 rounded-sm bg-[#DFF9EE]"
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

      <div className="rounded-sm border border-gray-200">
        <div className="overflow-x-auto rounded-sm">
          <AdminTable headers={tableHeadings}>
            <>
              {currentAdmins.length > 0 ? (
                currentAdmins.map((admin, index: number) => {
                  // Determine if this admin is a pending admin
                  const isPending = isPendingAdmin(
                    admin.channel_id,
                    admin.sub_channel_id,
                  );
                  const isCurrentUser = admin.email === userData.user.email;
                  const isSuspended =
                    admin.suspended_admins?.includes(admin.id) ?? false;

                  return (
                    <tr
                      key={index}
                      className="border border-[#0E1428] rounded-md"
                    >
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {admin.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {admin.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {admin.category}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {isPending ? (
                          <>
                            <button
                              onClick={() =>
                                resendInvite(
                                  admin.email,
                                  admin.channel_id,
                                  admin.sub_channel_id,
                                )
                              }
                              className="p-1 w-[90px] bg-[#03CF79] text-black hover:bg-teal-300 hover:text-white transition-colors"
                            >
                              Resend
                            </button>
                            {/*btn to delete channel that has pending admin*/}
                            <button
                              onClick={() =>
                                openDeleteModal(admin.sub_channel_id)
                              }
                              className="p-1 w-[90px] bg-[#FF2055] hover:bg-gray-100 hover:text-red-600 transition-colors ml-2 text-black"
                            >
                              Delete
                            </button>
                          </>
                        ) : isCurrentUser ? (
                          "-"
                        ) : (
                          <>
                            <button
                              onClick={
                                isSuspended
                                  ? () => handleUnsuspendChannel([admin.id, admin.sub_channel_id])
                                  : () => handleMessage(admin.email)
                              }
                              className={`p-1 w-[90px] ${isSuspended ? "bg-[#FFA620] cursor-not-allowed text-black" : "bg-[#0948EC] text-white hover:bg-gray-100 hover:text-teal-600 transition-colors"}`}
                            >
                              {isSuspended ? "Unsuspend" : "Message"}
                            </button>
                            <span className="mr-1" />
                            {
                              isSuspended && (
                            <button
                              onClick={
                                () => handleSuspendChannel([admin.id, admin.sub_channel_id])
                              }
                              className="p-1 w-[90px] bg-[#FF2055] cursor-not-allowed"
                            >
                              Suspend
                            </button>
                              )
                            }
                            { !isSuspended && (
                            <button
                              onClick={
                                  () => openDeleteModal(admin.sub_channel_id)
                              }
                              className="p-1 w-[90px] bg-[#FFCE20] hover:bg-gray-100 hover:text-red-600 transition-colors ml-2 text-black"
                            >
                              Delete
                            </button>)
                }
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    className="text-center text-xl text-orange-900"
                    colSpan={4}
                  >
                    No data available!😥
                  </td>
                </tr>
              )}
            </>
          </AdminTable>
        </div>

        <div className="px-4 py-2 mt-4">
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`inline-flex w-[103px] items-center justify-center border-none bg-white text-gray-900 rtl:rotate-180 hover:bg-gray-50 ${currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
                }`}
            >
              Back
            </button>

            <p className="text-xs text-gray-900">
              {currentPage}
              <span className="mx-0.25">/</span>
              {totalPages}
            </p>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`inline-flex w-[103px] items-center border-none justify-center bg-[#03CF79] text-white rtl:rotate-180 hover:bg-lime-500 ${currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        children={
          <div className="text-center">
            <h1 className="text-lg md:text-2xl font-semibold text-black mb-4">
              Delete this Channel?
            </h1>
            <p className="text-xs w-full font-medium sm:text-sm text-black mb-8">
              Deleting this channel would delete all administrative access &
              corresponding data
            </p>
            <p className="w-full mt-4 flex justify-center items-center gap-20">
              <span className="cursor-pointer" onClick={closeDeleteModal}>
                Cancel
              </span>
              <span
                className="bg-[#03CF79] text-white w-[131px] h-[36px] cursor-pointer justify-center flex items-center"
                onClick={() => handleDelete(activeModalData)}
              >
                Confirm
              </span>
            </p>
          </div>
        }
      />
    </section>
  );
};

export default ManageAdmins;
