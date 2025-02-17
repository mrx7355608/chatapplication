"use client";

import * as Ably from "ably";
import { ChatClient } from "@ably/chat";
import { useEffect } from "react";
import { useToast } from "./useToast";
import { useUser } from "@clerk/nextjs";

export default function useAbly() {
    const { addToast } = useToast();
    const { user } = useUser();

    /* Create ably and chat client instances */
    const ably = new Ably.Realtime({
        authUrl: "api/ably-authenticate",
    });
    const client = new ChatClient(ably);

    /* Connect to ably server and show connection status toasts */
    useEffect(() => {
        ably.connection.on("connected", showSuccessIndicator);
        ably.connection.on("disconnected", showErrorIndicator);

        return () => {
            ably.connection.off("connected", showSuccessIndicator);
            ably.connection.off("disconnected", showErrorIndicator);
        };
    }, []);

    function showSuccessIndicator() {
        const successMessage = "You have successfully connected to server";
        addToast("success", "Connected", successMessage);
    }

    function showErrorIndicator() {
        const errorMessage = "You have been disconnected from the server";
        addToast("error", "Disconnected", errorMessage);
    }

    /* Return chat client */
    return { client };
}
