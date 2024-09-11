export interface AdminData {
    id: number;
    email: string;
    name: string;
    category: string;
    channel_id: number;
    sub_channel_id: number;
    suspended_admins: null|number[];
}

export interface ChannelTable {
    admin_id: string | number;
    email: string;
    channels: Channels[];
}

export interface Channel {
    id: number;
    name: string;
    profileImage: string;
    description: string;
    type: string;
    institution_id: number;
    is_primary: boolean;
    rating: number;
    subscribers: number;
    super_admin_id: number;
    sub_admins: number[];
    sub_channels: number[];
    channelWebsite: string;
    suspended_admins: null|number[];
    pending_admins: null|number[];
    removed_admins: null|number[];
}

export interface Channels {
    channel_id: number;
    sub_channel_id: number;
    name: string;
    category: string;
    suspended_admins: null|number[];
}

export interface SubChannel {
    id: number;
    name: string;
    profileImage: string;
    description: string;
    type: string;
    category: string;
    targetAudience: string;
    subscribers: number;
    admin_id: number;
    admin: AdminProps;
    subchannelWebsite: null|string;
    status: string;
    deleted: boolean;
    primary_institution_id: number;
}

export interface AdminProps {
  id: number|string;
  firstname: string;
  lastname: string;
  email: string;
  channels: Channel[];
  sub_channels: SubChannel[];
}

export interface PendingAdmin {
    email: string;
    channel_id: number | null;
    sub_channel_id: number | null;
}
