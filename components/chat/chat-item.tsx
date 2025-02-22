"use client";
import { useMessages } from "@ably/chat";
import { IConversation } from "@/types/conversation-types";
import { useEffect, useRef, useState } from "react";
import ChatItemHeader from "./chat-header";
import ChatItemMessageInput from "./chat-item-message-input";
import { useUser } from "@clerk/nextjs";
import { Twemoji } from "react-emoji-render";

type Message = {
    clientId: string;
    text: string;
};

export default function ChatItem({ chat }: { chat: IConversation }) {
    const [messagesList, setMessagesList] = useState<Message[]>([]);
    const { user1, user2 } = chat;
    const { user: loggedInUser } = useUser();
    const friend = user1.username === loggedInUser?.username ? user2 : user1;
    const messagesListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!messagesListRef.current) {
            return;
        }

        const div = messagesListRef.current;
        div.scrollTop = div.scrollHeight;
    });

    useMessages({
        listener: (event) => {
            const { clientId, text } = event.message;
            setMessagesList([...messagesList, { clientId, text }]);
        },
    });

    return (
        <div className={`flex flex-col h-screen bg-transparent w-full`}>
            {/* Chat header */}
            <ChatItemHeader friend={friend} />

            {/* Chat messages */}
            <div
                ref={messagesListRef}
                className="overflow-y-auto p-4 space-y-2 w-full bg-base-100 scroll-smooth flex-1"
            >
                {messagesList.map((message, idx) => (
                    <div
                        key={idx}
                        className={`chat ${
                            message.clientId === friend.username
                                ? "chat-start"
                                : "chat-end"
                        }`}
                    >
                        <div className="chat-bubble bg-neutral text-lg ">
                            <Twemoji svg className="inline emoji">
                                {message.text.trim()}
                            </Twemoji>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message input with Typing indicator */}
            <ChatItemMessageInput />
        </div>
    );
}
