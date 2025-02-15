"use client";

import { createFCMApp } from "@/lib/firebase";
import { getToken, Messaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { useToast } from "./useToast";

export default function useFcmToken() {
    const { addToast } = useToast();

    useEffect(() => {
        getFcmToken().catch((err) => console.log(err.message, err.stack));
    }, []);

    async function getFcmToken() {
        /* Return if notifications are not allowed */
        if (!(await isNotificationAllowed())) {
            return;
        }

        /* Create FCM app */
        const messaging = createFCMApp();

        /* Get token */
        console.log("Trying to fetch token");
        const token = await getDeviceToken(messaging);
        console.log({ token });

        /* Register a notifications listener */
        onMessage(messaging, ({ notification }) => {
            console.log(notification);
            if (notification) {
                const title = notification.title || "Unknown notification";
                const body = notification.body || "Unknown message";
                addToast("info", title, body);
            }
        });
    }

    async function saveTokenInDatabase(token: string) {
        console.log("Saving token in db...");
        const response = await fetch("/api/save-tokens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });
        const result = await response.json();
        console.log({ result });
    }

    async function isNotificationAllowed() {
        const permission = await Notification.requestPermission();
        console.log("Notification permission:", permission);
        return permission === "granted" ? true : false;
    }

    async function getDeviceToken(messaging: Messaging) {
        try {
            /* If token already exists in localStorage, then return */
            let token = localStorage.getItem("fcm-token");
            if (token) {
                return token;
            }

            /* Get token from firebase */
            token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEYS,
            });

            /* Save token in browser and database */
            await saveTokenInDatabase(token);
            localStorage.setItem("fcm-token", token);

            return token;
        } catch (err: any) {
            console.log(err);
        }
    }

    return null;
}
