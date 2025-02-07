import { createFCMApp } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";

export default function useFcmToken() {
    const [token, setToken] = useState("");

    useEffect(() => {
        console.log("Requesting permission...");

        Notification.requestPermission().then(async (permission) => {
            if (permission === "denied") {
                console.warn("Notification permission denied!");
                return;
            }

            console.log("Notification permission granted.");

            // Fetch FCM token for this device
            const messaging = createFCMApp();
            const token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEYS,
            });
            setToken(token);

            console.log({ token });
            onMessage(messaging, (payload) => {
                console.log(payload.notification);
            });

            // TODO: store this token in local storage
        });
    }, []);

    return { fcmToken: token };
}
