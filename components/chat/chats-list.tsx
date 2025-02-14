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
        <div className="w-[350px] h-screen flex flex-col bg-transparent border-r border-gray-700">
            {/* SEARCH BAR */}
            <label className="input input-bordered flex items-center gap-2 px-4 m-2 my-4">
                <input type="text" className="grow" placeholder="Search" />
                <Search size={18} />
            </label>

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
            className="flex items-center p-3 hover:bg-gray-800 cursor-pointer"
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
                    <h2 className="text-sm font-semibold text-gray-100">
                        {friend.fullname}
                    </h2>
                    <span className="text-xs text-gray-500">11:30 AM</span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                    Hello! are you available for a chat?
                </p>
            </div>
        </div>
    );
}

export default ChatsList;
