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
    {name: "School Of International Relations", email: "hisroyaltyreward@gmail.com", category: "Faculty", action: {  message: "Message", suspend: "Suspend"}},
    { name: "School Of International Relations", email: "hisroyaltyreward@gmail.com", category: "Faculty", action: { message: "Message", suspend: "Suspend" } },
    { name: "School Of Business",email: "hisroyaltyreward@gmail.com", category: "Business", action: { message: "Message", suspend: "Delete" } },
    { name: "School Of Art", email: "hisroyaltyreward@gmail.com", category: "Art", action: { message: "Resend", suspend: "Suspend" } },
    { name: "School Of Engineering", email: "hisroyaltyreward@gmail.com", category: "Engineering", action: { message: "Message", suspend: "Suspend" } },
    { name: "School Of Medicine", email: "hisroyaltyreward@gmail.com", category: "Medicine", action: { message: "Unsuspend", suspend: "Delete" } },
    { name: "School Of Law", email: "hisroyaltyreward@gmail.com", category: "Law", action: { message: "Message", suspend: "Suspend" } },
    { name: "School Of Music", email: "hisroyaltyreward@gmail.com", category: "Music", action: { message: "Message", suspend: "Delete" } },
    { name: "School Of Science", email: "hisroyaltyreward@gmail.com", category: "Science", action: { message: "Resend", suspend: "Suspend" } },
    { name: "School Of Technology", email: "hisroyaltyreward@gmail.com", category: "Technology", action: { message: "Message", suspend: "Suspend" } },
    { name: "School Of Humanities", email: "hisroyaltyreward@gmail.com", category: "Humanities", action: { message: "Unsuspend", suspend: "Delete" } },
    {name: "School Of International Relations", email: "hisroyaltyreward@gmail.com", category: "Faculty", action: {  message: "Message", suspend: "Suspend"}},
    { name: "School Of International Relations", email: "hisroyaltyreward@gmail.com", category: "Faculty", action: { message: "Message", suspend: "Suspend" } },
    { name: "School Of Business",email: "hisroyaltyreward@gmail.com", category: "Business", action: { message: "Message", suspend: "Delete" } },
    { name: "School Of Art", email: "hisroyaltyreward@gmail.com", category: "Art", action: { message: "Resend", suspend: "Suspend" } },
    { name: "School Of Engineering", email: "hisroyaltyreward@gmail.com", category: "Engineering", action: { message: "Message", suspend: "Suspend" } },
    { name: "School Of Medicine", email: "hisroyaltyreward@gmail.com", category: "Medicine", action: { message: "Unsuspend", suspend: "Delete" } },
    { name: "School Of Law", email: "hisroyaltyreward@gmail.com", category: "Law", action: { message: "Message", suspend: "Suspend" } },
    { name: "School Of Music", email: "hisroyaltyreward@gmail.com", category: "Music", action: { message: "Message", suspend: "Delete" } },
    { name: "School Of Science", email: "hisroyaltyreward@gmail.com", category: "Science", action: { message: "Resend", suspend: "Suspend" } },
    { name: "School Of Technology", email: "hisroyaltyreward@gmail.com", category: "Technology", action: { message: "Message", suspend: "Suspend" } },
    { name: "School Of Humanities", email: "hisroyaltyreward@gmail.com", category: "Humanities", action: { message: "Unsuspend", suspend: "Delete" } },
];
