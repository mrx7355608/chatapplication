"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { IConversation } from "@/types/conversation-types";
import { useChats } from "@/context/chats-context";
import ChatSkeletonLoading from "./chat-skeleton-loading";
import { useEffect, useState } from "react";

export default function ChatsList() {
    const { loading, chats, setActiveChat } = useChats();
    const { user } = useUser();
    const [myChats, setMyChats] = useState(chats);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (chats.length > 0) {
            setMyChats(chats);
        }
        if (query.trim().length > 0) {
            // Filter those chats whose fullname or username
            // matches with the "query"
            const filteredChats = chats.filter(({ user1, user2 }) => {
                const friend =
                    user1.username === user?.username ? user2 : user1;
                console.log(friend.fullname);
                const { fullname, username } = friend;
                return (
                    fullname.includes(query.toLowerCase()) ||
                    username.includes(query.toLowerCase())
                );
            });
            setMyChats(filteredChats);
        }
    }, [query, chats]);

    return (
        <div className="w-full lg:w-[350px] lg:min-w-[350px] h-screen flex flex-col bg-transparent border-r border-neutral">
            {/* SEARCH BAR */}
            <label className="input rounded-md bg-base-100 input-bordered shadow-lg flex items-center gap-2 px-4 m-2 my-4">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Search size={18} />
            </label>

            {/* LIST */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <>
                        <ChatSkeletonLoading />
                        <ChatSkeletonLoading />
                        <ChatSkeletonLoading />
                    </>
                ) : (
                    myChats.map((chat) => (
                        <ChatUser
                            key={chat.id}
                            chat={chat}
                            setActiveChat={() => setActiveChat(chat)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

type ChatUserProps = {
    chat: IConversation;
    setActiveChat: () => void;
};

function ChatUser({ chat, setActiveChat }: ChatUserProps) {
    const { user } = useUser();
    const { user1, user2 } = chat;
    const friend = user1.username === user?.username ? user2 : user1;

    return (
        <div
            className="flex items-center p-3 hover:bg-base-200 cursor-pointer"
            onClick={setActiveChat}
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
                    <h2 className="font-semibold">{friend.fullname}</h2>
                    <span className="text-xs text-mute ">11:30 AM</span>
                </div>
                <p className="text-sm truncate">
                    Hello! are you available for a chat?
                </p>
            </div>
        </div>
    );
}
