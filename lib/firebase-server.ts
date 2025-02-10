import admin from "firebase-admin";

export function createFirebaseAdminApp() {
    let app = admin.apps[0];

    /* If not existing app */
    if (!app) {
        /* Create a new one */
        app = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
        });
    }

    return app;
}
