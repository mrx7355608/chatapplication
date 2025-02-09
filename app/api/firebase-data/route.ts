import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    return Response.json(firebaseConfig, { status: 200 });
}
