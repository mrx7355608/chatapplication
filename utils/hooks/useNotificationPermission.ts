import { useEffect, useState } from "react";

export default function useNotificationsPermission() {
    const [permission, setPermission] =
        useState<NotificationPermission>("denied");

    useEffect(() => {
        Notification.requestPermission().then((perm) => {
            setPermission(perm);
        });
    }, []);

    return { permission };
}
