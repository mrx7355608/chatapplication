"use client";

import { createFCMApp } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";

export default function useFcmToken() {
    useEffect(() => {
        console.log("Requesting permission...");

        Notification.requestPermission().then(async (permission) => {
            if (permission === "denied") {
                console.warn("Notification permission denied!");
                return;
            }

            console.log("Notification permission granted.");

            /* Create FCM App to register a listener */
            const messaging = createFCMApp();

            /* Check if token is in localstorage */
            let token = localStorage.getItem("fcm-token");

            /* If not, then fetch it from firebase */
            if (!token) {
                token = await getToken(messaging, {
                    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEYS,
                });
            }

            console.log({ token });

            /* After fetching token, register a listener for notifications */
            onMessage(messaging, (payload) => {
                // TODO: show a toast here when notification is received
                console.log(payload.notification);
            });
        });
    }, []);

    return null;
}
