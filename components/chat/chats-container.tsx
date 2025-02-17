"use client";

import { useRef } from "react";
import ChatItem from "./chat-item";
import ChatsList from "./chats-list";
import useAbly from "@/utils/hooks/useAbly";
import { useUser } from "@clerk/nextjs";
import { IConversation } from "@/utils/types/conversation-types";
import {
    ChatClientProvider,
    ChatRoomProvider,
    RoomOptionsDefaults,
} from "@ably/chat";

export default function ChatsContainer({ chats }: { chats: IConversation[] }) {
    const { user } = useUser();

    /* Connect to ably */
    const { client } = useAbly();

    // const roomOptions = {
    //     presence: true,
    //     typing: {
    //         timeoutMs: 3000,
    //     },
    //     attach: false,
    // };

    return (
        <div className="flex w-full">
            <ChatClientProvider client={client}>
                <ChatsList chats={chats} />
                {chats.map((chat) => {
                    return (
                        <ChatRoomProvider
                            id={chat.id}
                            key={chat.id}
                            options={RoomOptionsDefaults}
                        >
                            <ChatItem friend={chat.user2} />
                        </ChatRoomProvider>
                    );
                })}
            </ChatClientProvider>
        </div>
    );
}
