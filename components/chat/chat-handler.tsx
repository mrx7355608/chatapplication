"use client";

const ChatsContainer = dynamic(() => import("./chats-container"), {
    ssr: false,
});
import dynamic from "next/dynamic";

export default function ChatHandler() {
    return <ChatsContainer />;
}
