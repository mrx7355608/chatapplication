import { messaging } from "@/lib/firebase";
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
            const token = await getToken(messaging, {
                vapidKey:
                    "BIolCjGZkpxzFsCaWa1Ox2wBumIjjuHluePGogZ0JLDMNtXFWTM6r8RqsL_P0iN65RDMT15xZXPwK5_yVrJh0Ug",
            });
            console.log({ token });
            setToken(token);
            onMessage(messaging, payload => console.log(payload))
            // TODO: store this token in local storage
        });
    }, []);

    return { fcmToken: token };
}
