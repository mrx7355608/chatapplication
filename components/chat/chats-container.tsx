"use client";

import { useState } from "react";
import ChatItem from "./chat-item";
import ChatsList from "./chats-list";
import { useUser } from "@clerk/nextjs";
import { IConversation } from "@/utils/types/conversation-types";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat";
import useConnectionManager from "@/utils/hooks/useConnection";

export default function ChatsContainer() {
    const [activeChat, setActiveChat] = useState<IConversation | null>(null);
    const { user } = useUser();
    const { client } = useConnectionManager();
    const roomOptions = {
        typing: {
            timeoutMs: 1000,
        },
    };

    return (
        <ChatClientProvider client={client}>
            <div className="flex w-full">
                <ChatsList setActiveChat={setActiveChat} />
                {activeChat && (
                    <ChatRoomProvider id={activeChat.id} options={roomOptions}>
                        <ChatItem
                            chat={activeChat}
                            friend={
                                activeChat.user2.username === user?.username
                                    ? activeChat.user1
                                    : activeChat.user2
                            }
                        />
                    </ChatRoomProvider>
                )}
            </div>
        </ChatClientProvider>
    );
}
