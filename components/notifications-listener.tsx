"use client";

import React from "react";
import useFcmToken from "@/utils/hooks/useFcmToken";

const NotificationsListener = () => {
    // Fetches the fcm token and registers an eventListener to show notifications
    // while app is in foreground
    useFcmToken();

    return <></>;
};

export default NotificationsListener;
