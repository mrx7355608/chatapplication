"use client";

import { useToast } from "@/hooks/useToast";
import { useChatConnection } from "@ably/chat";
import React, { useEffect } from "react";

export default function ClientConnectionIndicator() {
    const { addToast } = useToast();
    const { currentStatus } = useChatConnection();
    const connectedMessage = "You have successfully connected to server";
    const disconnectionMessage = "You have been disconnected from the server";
    const failedMessage = "Unable to reconnect after multiple retries";
    const suspendedMessage =
        "There appears to be a problem with your internet connection";

    useEffect(() => {
        switch (currentStatus) {
            case "connected":
                addToast("success", "Connected", connectedMessage);
                break;

            case "disconnected":
                addToast("error", "Disconnected", disconnectionMessage);
                break;

            case "failed":
                addToast("error", "Server Error", failedMessage);
                break;

            case "suspended":
                addToast("error", "Reconnecting", suspendedMessage);
                break;
        }
    }, [currentStatus]);

    return <></>;
}
