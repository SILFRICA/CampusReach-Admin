export interface AdminData {
  email: string;
  name: string;
  category: string;
}

export interface ChannelTable {
  email: string;
  channels: [];
}

export interface Channel {
  name: string;
  type: string;
}

export interface SubChannel {
  name: string;
  category: string;
}

export interface AdminProps {
  email: string;
  channels: Channel[];
  sub_channels: SubChannel[];
}
