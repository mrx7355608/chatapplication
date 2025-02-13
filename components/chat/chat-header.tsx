"use client";

import { useState } from "react";
import { usePresence, usePresenceListener } from "@ably/chat";
import { IMember } from "@/types/conversation-types";
import Image from "next/image";

export default function ChatItemHeader({ friend }: { friend: IMember }) {
    const [isFriendOnline, setIsFriendOnline] = useState(false);

    usePresence({
        enterWithData: "Online",
        leaveWithData: "Offline",
    });

    usePresenceListener({
        listener: (event) => {
            const { clientId, data } = event;
            setIsFriendOnline(
                clientId === friend.username && data === "Online"
                    ? true
                    : false,
            );
        },
    });

    return (
        <div className="bg-[#075e54] text-white p-4 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
                <Image
                    src={friend.image}
                    alt="user avatar"
                    className="rounded-full"
                    width={80}
                    height={80}
                />
            </div>
            <div>
                <h2 className="font-semibold">{friend.fullname}</h2>
                <p className="text-xs">
                    {isFriendOnline ? "Online" : "Offline"}
                </p>
            </div>
        </div>
    );
}
