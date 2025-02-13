export interface IMember {
    id: string;
    fullname: string;
    username: string;
    image: string;
}

export interface IConversation {
    id: string;
    user1: IMember;
    user2: IMember;
}
