"use client";

import { createFCMApp } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { useToast } from "./useToast";

export default function useFcmToken() {
    const { addToast } = useToast();

    useEffect(() => {
        getFcmToken().catch(console.error);
    }, []);

    async function getFcmToken() {
        const permission = await Notification.requestPermission();
        console.log("Notification permission:", permission);

        if (permission === "denied" || permission === "default") {
            return;
        }

        /* Create FCM App */
        const messaging = createFCMApp();

        /* Fetch token from local storage */
        let token = localStorage.getItem("fcm-token");

        /* if token does not exist, sent a request to firebase */
        if (!token) {
            token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEYS,
            });

            await saveTokenInDatabase(token);
            localStorage.setItem("fcm-token", token);
        }

        console.log({ token })

        /* Otherwise don't fetch token and register a notifications listener */
        onMessage(messaging, ({ notification }) => {
            if (notification) {
                const title = notification.title || "Unknown notification";
                const body = notification.body || "Unknown message";
                addToast("info", title, body);
            }
        });
    }

    async function saveTokenInDatabase(token: string) {
        console.log("Saving token in db...");
        const response = await fetch("/api/save-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });
        const result = await response.json();
        console.log({ result });
    }

    return null;
}
