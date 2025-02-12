export interface IMember {
    id: string;
    fullname: string;
    username: string;
    image: string;
}

export interface IConversation {
    id: string;
    type: "PRIVATE" | "GROUP";
    members: IMember[];
}
