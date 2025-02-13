"use client";
import { useEffect, useState } from "react";
import ChatItem from "./chat-item";
import ChatsList from "./chats-list";
import { IConversation } from "@/types/conversation-types";
import * as Ably from "ably";
import { ChatClient, ChatClientProvider, ChatRoomProvider } from "@ably/chat";
import { useUser } from "@clerk/nextjs";

export default function ChatsContainer({ chats }: { chats: IConversation[] }) {
    const [activeChat, setActiveChat] = useState<IConversation | null>(null);
    const { user } = useUser();

    /* Connect to ably */
    const ably = new Ably.Realtime({
        authUrl: "http://localhost:3000/api/ably-authenticate",
    });
    const client = new ChatClient(ably);

    return (
        <ChatClientProvider client={client}>
            <div className="flex w-full">
                <ChatsList chats={chats} setActiveChat={setActiveChat} />
                {activeChat !== null && (
                    <ChatRoomProvider
                        id={activeChat.id}
                        options={{
                            presence: true,
                            typing: {
                                timeoutMs: 3000,
                            },
                        }}
                    >
                        <ChatItem
                            friend={
                                activeChat.user1.username === user?.username
                                    ? activeChat.user2
                                    : activeChat.user1
                            }
                        />
                    </ChatRoomProvider>
                )}
            </div>
        </ChatClientProvider>
    );
}
