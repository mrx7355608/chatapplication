import { useEffect } from "react";
import useFcmToken from "./useFcmToken";
import { createFCMApp } from "@/lib/firebase";
import { onMessage } from "firebase/messaging";
import { useToast } from "./useToast";

export default function useFcm() {
    const { fcmToken } = useFcmToken();
    const { addToast } = useToast();

    useEffect(() => {
        if (!fcmToken) {
            return;
        }
        const messaging = createFCMApp();
        onMessage(messaging, ({ notification }) => {
            console.log(notification);
            if (notification) {
                const title = notification.title || "Unknown notification";
                const body = notification.body || "Unknown message";
                addToast("info", title, body);
            }
        });
    }, [fcmToken]);

    return null;
}
