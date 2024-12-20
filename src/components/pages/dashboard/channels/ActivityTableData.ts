// ActivityTableData.ts
export interface Activity {
  channelName: string;
  reach: string;
  timestamp: string;
}

export const activityData: Activity[] = [
  {
    channelName: "Channel 1",
    reach: "Public",
    timestamp: "2024-10-01 10:30 AM",
  },
  {
    channelName: "Channel 2",
    reach: "Institution",
    timestamp: "2024-10-02 02:15 PM",
  },
  {
    channelName: "Channel 3",
    reach: "Public",
    timestamp: "2024-10-03 08:45 AM",
  },
  {
    channelName: "Channel 4",
    reach: "Public",
    timestamp: "2024-12-01 09:30 AM",
  },
  {
    channelName: "Channel 5",
    reach: "Public",
    timestamp: "2024-13-02 02:30 PM",
  },
  {
    channelName: "Channel 6",
    reach: "Institution",
    timestamp: "2024-13-03 02:45 AM",
  },
  {
    channelName: "Channel 7",
    reach: "Institution",
    timestamp: "2024-14-01 08:30 PM",
  },
  {
    channelName: "Channel 8",
    reach: "Public",
    timestamp: "2024-18-02 02:15 PM",
  },
  {
    channelName: "Channel 9",
    reach: "Institution",
    timestamp: "2024-18-03 08:45 AM",
  },
  {
    channelName: "Channel 10",
    reach: "Public",
    timestamp: "2024-18-01 10:30 AM",
  },
];