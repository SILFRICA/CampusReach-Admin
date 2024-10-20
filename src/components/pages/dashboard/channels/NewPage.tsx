import { channels } from "../channels/channelData";
import ArrowDownChannel from "@/assets/Arrow-downChannel.svg";
import Filter from "@/assets/Filter.svg";

const NewChannel = () => {
    return (
        <div className="flex flex-col h-screen p-6">
            {/* Header with channel list and create button */}
            <div className="flex justify-between items-center w-full mb-6">
                <h1 className="text-[16px] font-medium">Channel List:</h1>

                {/* Dropdown */}
                <div className="relative flex gap-3 items-center flex-1">
                    <div className="relative">
                        <select
                            id="options"
                            name="options"
                            className="p-2 focus:outline-none appearance-none text-[16px] font-bold cursor-pointer"
                        >
                            <option value="option1">All</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>

                        {/* Custom arrow-down icon */}
                        <img
                            src={ArrowDownChannel}
                            alt="down-arrow"
                            className="absolute right-[1.5rem] top-1/2 transform -translate-y-1/2 pointer-events-none"
                        />
                    </div>

                </div>
                <button className="bg-[#03CF79] hover:bg-[#03cf7af7] text-white font-bold py-2 px-4">
                    Create New Channel
                </button>
            </div>

            {/* Dropdown and Search Input */}
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
                    {channels.map((channel, index) => (
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
                                        className={`${channel.action.suspend === "Delete" ? "bg-red-500" : "bg-yellow-500"
                                            } text-white py-1 px-4 w-28 text-center`}
                                    >
                                        {channel.action.suspend}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-16 mt-6">
                <button className="bg-transparent text-black font-bold py-2 px-4">
                    Back
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Next
                </button>
            </div>
        </div>
    );
};

export default NewChannel;

