"use client";

import { useChats } from "@/utils/context/chats-context";
import ChatItem from "./chat-item";
import ChatsList from "./chats-list";
import { ChatRoomProvider } from "@ably/chat";

export default function ChatsContainer() {
    const { activeChat } = useChats();

    const roomOptions = {
        typing: {
            timeoutMs: 1000,
        },
    };

    return (
        <div className="flex w-full">
            <div className="flex lg:hidden w-full">
                {activeChat ? (
                    <ChatRoomProvider id={activeChat.id} options={roomOptions}>
                        <ChatItem chat={activeChat} />
                    </ChatRoomProvider>
                ) : (
                    <ChatsList />
                )}
            </div>
            <div className="hidden lg:flex w-full">
                <ChatsList />
                {activeChat && (
                    <ChatRoomProvider id={activeChat.id} options={roomOptions}>
                        <ChatItem chat={activeChat} />
                    </ChatRoomProvider>
                )}
            </div>
        </div>
    );
}
