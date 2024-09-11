import { AdminProps } from "../admins/AdminsChannelsTypes";

export interface HomeDataResponse {
    amount_of_posts: number;
    campus_population: number;
    channels_managed: null|number[];
    sub_channels_managed: null|number[];
    post_stats: period;
    sub_admins: AdminProps[];
    pending_admins: [];
    institution: institution;
    activities: postPeriod;
}

interface period {
    all: number;
    last_7_days: number;
    last_30_days: number;
}

interface postPeriod {
    total_posts: number;
    last_7_days_posts: number;
    last_30_days_posts: number;
}

interface institution {
    id: number;
    name: string;
}
