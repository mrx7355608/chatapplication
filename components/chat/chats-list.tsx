"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { IConversation } from "@/utils/types/conversation-types";

type Props = {
    chats: IConversation[];
};

export default function ChatsList({ chats }: Props) {
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
                    <ChatUser key={chat.id} chat={chat} />
                ))}
            </div>
        </div>
    );
}

type ChatUserProps = {
    chat: IConversation;
};

function ChatUser({ chat }: ChatUserProps) {
    const { user } = useUser();
    const { user1, user2 } = chat;
    const friend = user1.username === user?.username ? user2 : user1;

    return (
        <div className="flex items-center p-3 hover:bg-gray-800 cursor-pointer">
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
