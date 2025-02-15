"use client";

import React from "react";
import useFcm from "@/utils/hooks/useFcm";

const NotificationsListener = () => {
    // Fetches the fcm token and registers an eventListener to show notifications
    // while app is in foreground
    useFcm();

    return <></>;
};

export default NotificationsListener;
