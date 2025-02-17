"use client";
import { useMessages, useRoom } from "@ably/chat";
import { IMember } from "@/utils/types/conversation-types";
import { useEffect, useState } from "react";
import ChatItemHeader from "./chat-header";
import ChatItemMessageInput from "./chat-item-message-input";

type Message = {
    clientId: string;
    text: string;
};

export default function ChatItem({ friend }: { friend: IMember }) {
    const [messagesList, setMessagesList] = useState<Message[]>([]);

    console.log("Rendered chat with Friend:", friend.username);

    useMessages({
        listener: (event) => {
            const { clientId, text } = event.message;
            setMessagesList([...messagesList, { clientId, text }]);
        },
    });

    return (
        <div className="flex flex-col h-screen bg-[#f0f2f5] w-full">
            {/* Chat header */}
            <ChatItemHeader friend={friend} />

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 w-full">
                {messagesList.map((message, idx) => (
                    <div
                        key={idx}
                        className={`chat ${message.clientId === friend.username ? "chat-start" : "chat-end"}`}
                    >
                        <div className="chat-bubble">{message.text}</div>
                    </div>
                ))}
            </div>

            {/* Message input with Typing indicator */}
            <ChatItemMessageInput />
        </div>
    );
}
