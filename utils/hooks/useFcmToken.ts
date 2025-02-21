"use client";

import { createFCMApp } from "@/lib/firebase";
import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import useNotificationsPermission from "./useNotificationPermission";

export default function useFcmToken() {
    const { permission } = useNotificationsPermission();
    const [fcmToken, setFcmToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (permission === "granted") {
            getFcmToken();
        }
    }, [permission]);

    async function getFcmToken() {
        const messaging = createFCMApp();

        /* Get previously stored token from local storage */
        let token = localStorage.getItem("fcm-token");
        if (token) {
            setFcmToken(token);
            return;
        }

        /* Otherwise, get token from firebase */
        console.log("--- Fetching token from firebase ---");
        token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEYS,
        });
        if (!token) {
            console.error("Unable to fetch FCM token");
            return;
        }

        /* Save token in mongodb */
        console.log("--- Saving Token in Database ---");
        await saveTokenInDatabase(token);

        /* Save token in local storage */
        localStorage.setItem("fcm-token", token);
        setFcmToken(token);
    }

    async function saveTokenInDatabase(token: string) {
        const response = await fetch("/api/save-tokens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
            credentials: "include",
        });
        const result = await response.json();
        console.log({ result });
    }

    return { fcmToken };
}
