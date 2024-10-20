export interface Channel {
    name: string;
    email: string;
    category: string;
    action: {
        message: string;
        suspend: string;
    };
}

export const channels: Channel[] = [
    {
        name: "School Of International Relations",
        email: "hisroyaltyreward@gmail.com",
        category: "Faculty",
        action: {
            message: "Message",
            suspend: "Suspend"
        }
    },
    {
        name: "School Of International Relations",
        email: "hisroyaltyreward@gmail.com",
        category: "Faculty",
        action: {
            message: "Unsuspend",
            suspend: "Delete"
        }
    },
    {
        name: "School Of International Relations",
        email: "hisroyaltyreward@gmail.com",
        category: "Faculty",
        action: {
            message: "Resend",
            suspend: "Delete"
        }
    },
    {
        name: "School Of International Relations",
        email: "hisroyaltyreward@gmail.com",
        category: "Faculty",
        action: {
            message: "Message",
            suspend: "Suspend"
        }
    },
    {
        name: "School Of International Relations",
        email: "hisroyaltyreward@gmail.com",
        category: "Faculty",
        action: {
            message: "Unsuspend",
            suspend: "Delete"
        }
    }
];
