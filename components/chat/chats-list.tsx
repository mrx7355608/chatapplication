"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { IConversation } from "@/types/conversation-types";
import { Dispatch, SetStateAction } from "react";

type Props = {
    chats: IConversation[];
    setActiveChat: Dispatch<SetStateAction<IConversation | null>>;
};

const ChatsList = ({ chats, setActiveChat }: Props) => {
    return (
        <div className="w-80 h-screen flex flex-col bg-white border-r">
            {/* SEARCH BAR */}
            <div className="p-2 bg-white">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* LIST */}
            <div className="flex-1 overflow-y-auto">
                {chats.map((chat) => (
                    <ChatUser
                        key={chat.id}
                        chat={chat}
                        setActiveChat={setActiveChat}
                    />
                ))}
            </div>
        </div>
    );
};

type ChatUserProps = {
    chat: IConversation;
    setActiveChat: Dispatch<SetStateAction<IConversation | null>>;
};

function ChatUser({ chat, setActiveChat }: ChatUserProps) {
    const { user } = useUser();
    const { user1, user2 } = chat;
    const friend = user1.username === user?.username ? user2 : user1;

    return (
        <div
            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => setActiveChat(chat)}
        >
            <Image
                src={friend.image}
                alt={friend.username + " avatar"}
                width={50}
                height={50}
                className="rounded-full mr-3"
            />
            <div className="flex-1">
                <div className="flex justify-between items-baseline">
                    <h2 className="text-sm font-semibold">{friend.fullname}</h2>
                    <span className="text-xs text-gray-500">11:30 AM</span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                    Hello! are you available for a chat?
                </p>
            </div>
            <div className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                23
            </div>
        </div>
    );
}

export default ChatsList;
