import { createFirebaseAdminApp } from "./firebase-server";
import { getMessaging, MulticastMessage } from "firebase-admin/messaging";

export async function sendNotification(
    tokens: string[],
    title: string,
    body: string,
    userImage: string,
) {
    const payload: MulticastMessage = {
        tokens,
        data: {
            title,
            body,
            image: userImage,
            url: "http://localhost:3000/pending-requests",
        },
    };

    const app = createFirebaseAdminApp();
    const response = await getMessaging(app).sendEachForMulticast(payload);
    console.log(response.failureCount, " messages were failed");
    return response;
}
