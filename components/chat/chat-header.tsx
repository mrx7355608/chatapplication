"use client";

import { useState } from "react";
import { usePresence, usePresenceListener } from "@ably/chat";
import { IMember } from "@/types/conversation-types";
import Image from "next/image";

export default function ChatItemHeader({ friend }: { friend: IMember }) {
    const [isFriendOnline, setIsFriendOnline] = useState(false);

    /* Subscribe to presence events */
    usePresence({
        enterWithData: "Online",
        leaveWithData: "Offline",
    });

    /* Listen to the events, and update user's online status */
    usePresenceListener({
        listener: ({ clientId, action }) => {
            if (clientId === friend.username) {
                setIsFriendOnline(
                    action === "enter" || action === "present" ? true : false,
                );
            }
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
