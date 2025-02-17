"use client";

import { useEffect, useState } from "react";
import {
    RoomOptionsDefaults,
    usePresence,
    usePresenceListener,
    useRoom,
} from "@ably/chat";
import { IMember } from "@/utils/types/conversation-types";
import Image from "next/image";
import useConnectionManager from "@/utils/hooks/useConnection";

export default function ChatItemHeader({ friend }: { friend: IMember }) {
    const [isFriendOnline, setIsFriendOnline] = useState(false);
    const { client } = useConnectionManager();
    const { roomId } = useRoom();

    const { room } = useRoom();
    useEffect(() => {
        client.rooms
            .get(roomId, {
                presence: { enter: true },
                typing: { timeoutMs: 2000 },
            })
            .then(async (room) => {
                const onlineMembers = await room.presence.get();
                const friendOnlineStatus = onlineMembers.filter(
                    (m) => m.clientId === friend.username
                )[0];
                setIsFriendOnline(friendOnlineStatus ? true : false);
            });
    }, []);

    // use
    /* Subscribe to presence events */
    // usePresence();

    /* Listen to the events, and update user's online status */
    usePresenceListener({
        listener: ({ clientId, action }) => {
            if (clientId === friend.username) {
                setIsFriendOnline(action === "leave" ? false : true);
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
