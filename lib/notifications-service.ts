import { createFirebaseAdminApp } from "./firebase-server";
import { getMessaging } from "firebase-admin/messaging";

export async function sendNotification(
    token: string,
    title: string,
    body: string,
) {
    const payload = {
        notification: {
            title,
            body,
        },
        token,
    };

    const app = createFirebaseAdminApp();
    const response = await getMessaging(app).send(payload);
    return response;
}
