"use client";
import useFcmToken from "@/hooks/useFcmToken";
import React, { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

const Notifications = () => {
    const { fcmToken } = useFcmToken();

    return <></>;
};

export default Notifications;
