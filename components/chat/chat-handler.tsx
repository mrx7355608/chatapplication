"use client";

const ChatsContainer = dynamic(() => import("./chats-container"), {
    ssr: false,
});
import { IConversation } from "@/types/conversation-types";
import dynamic from "next/dynamic";

export default function ChatHandler({ chats }: { chats: IConversation[] }) {
    return <ChatsContainer chats={chats} />;
}
