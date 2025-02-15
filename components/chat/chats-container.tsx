"use client";
import { useState } from "react";
import ChatItem from "./chat-item";
import ChatsList from "./chats-list";
import useAbly from "@/utils/hooks/useAbly";
import { useUser } from "@clerk/nextjs";
import { IConversation } from "@/utils/types/conversation-types";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat";

export default function ChatsContainer({ chats }: { chats: IConversation[] }) {
    const [activeChat, setActiveChat] = useState<IConversation | null>(null);
    const { user } = useUser();

    /* Connect to ably */
    const { client } = useAbly();

    const roomOptions = {
        presence: true,
        typing: {
            timeoutMs: 3000,
        },
    };

    return (
        <div className="flex w-full">
            <ChatsList chats={chats} setActiveChat={setActiveChat} />
            <ChatClientProvider client={client}>
                {activeChat !== null && (
                    <ChatRoomProvider id={activeChat.id} options={roomOptions}>
                        <ChatItem
                            friend={
                                activeChat.user1.username === user?.username
                                    ? activeChat.user2
                                    : activeChat.user1
                            }
                        />
                    </ChatRoomProvider>
                )}
            </ChatClientProvider>
        </div>
    );
}
