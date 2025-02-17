"use client";

import { useEffect, useState } from "react";
import ChatItem from "./chat-item";
import ChatsList from "./chats-list";
import { useUser } from "@clerk/nextjs";
import { IConversation } from "@/utils/types/conversation-types";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat";
import useConnectionManager from "@/utils/hooks/useConnection";
import { Spinner } from "../spinner";

const roomOptions = {
    presence: { enter: true },
    typing: {
        timeoutMs: 2000,
    },
};

export default function ChatsContainer({ chats }: { chats: IConversation[] }) {
    const [activeChat, setActiveChat] = useState<IConversation | null>(null);
    const { user } = useUser();
    const { client } = useConnectionManager();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function joinAllRooms() {
            await Promise.all(
                chats.map(async (chat) => {
                    const room = await client.rooms.get(chat.id, roomOptions);
                    room.presence.subscribe(() => {});
                    room.presence.enter();
                })
            ).finally(() => setLoading(false));
        }

        async function leaveAllRooms() {
            await Promise.all(
                chats.map(async (chat) => {
                    const room = await client.rooms.get(chat.id, roomOptions);
                    // room.presence.unsubscribeAll()
                    room.presence.leave();
                })
            );
        }

        joinAllRooms();

        return () => {
            leaveAllRooms();
        };
    }, []);

    if (loading) {
        return <Spinner size="md" />;
    }

    return (
        <div className="flex w-full">
            <ChatClientProvider client={client}>
                <ChatsList chats={chats} setActiveChat={setActiveChat} />
                {activeChat && (
                    <ChatRoomProvider
                        id={activeChat.id}
                        key={activeChat.id}
                        options={roomOptions}
                    >
                        <ChatItem
                            friend={
                                activeChat.user2.username === user?.username
                                    ? activeChat.user1
                                    : activeChat.user2
                            }
                        />
                    </ChatRoomProvider>
                )}
            </ChatClientProvider>
        </div>
    );
}
