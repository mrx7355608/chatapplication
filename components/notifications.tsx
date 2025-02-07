"use client";
import useFcmToken from "@/hooks/useFcmToken";
import React from "react";

const Notifications = () => {
    // Fetches the fcm token and registers an eventListener to show notifications
    // while app is in foreground
    useFcmToken();

    return <></>;
};

export default Notifications;
