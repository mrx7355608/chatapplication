"use client";

import { useState } from "react";
import ChatItem from "./chat-item";
import ChatsList from "./chats-list";
import { ChatRoomProvider } from "@ably/chat";
import { IConversation } from "@/utils/types/conversation-types";

export default function ChatsContainer() {
    const [activeChat, setActiveChat] = useState<IConversation | null>(null);
    const roomOptions = {
        typing: {
            timeoutMs: 1000,
        },
    };

    return (
        <div className="flex w-full">
            <ChatsList setActiveChat={setActiveChat} />
            {activeChat && (
                <ChatRoomProvider id={activeChat.id} options={roomOptions}>
                    <ChatItem chat={activeChat} />
                </ChatRoomProvider>
            )}
        </div>
    );
}
