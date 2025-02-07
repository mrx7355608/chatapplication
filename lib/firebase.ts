import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

export function createFCMApp() {
    // Fuck you, I have deleted the old test app
    // and created a new one
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const firebase = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebase);
    return messaging;
}
