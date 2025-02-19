"use client";

import { useEffect } from "react";
import { useToast } from "./useToast";
import { connectAbly, getChatClient } from "@/lib/connect-ably";

const ably = connectAbly();
const client = getChatClient();

export default function useConnectionManager() {
    const { addToast } = useToast();

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

    return { client };
}
