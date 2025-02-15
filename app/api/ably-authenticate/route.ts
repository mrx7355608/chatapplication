import { usersDB } from "@/utils/data/users.data";
import { auth } from "@clerk/nextjs/server";
import * as Ably from "ably";

// ensure Vercel doesn't cache the result of this route,
// as otherwise the token request data will eventually become outdated
// and we won't be able to authenticate on the client side
export const revalidate = 0;

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await usersDB.findByClerkId(userId);
    if (!user) {
        return Response.json({ error: "Account not found" }, { status: 404 });
    }

    const client = new Ably.Rest({
        key: process.env.ABLY_API_KEY,
    });
    const tokenRequestData = await client.auth.createTokenRequest({
        clientId: user.username,
    });
    return Response.json(tokenRequestData);
}
