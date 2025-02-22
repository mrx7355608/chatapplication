import { conversationsDB } from "@/data/conversations.data";
import { usersDB } from "@/data/users.data";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return Response.json({ error: "oops" });
    }

    const user = await usersDB.findByClerkId(userId);
    const data = await conversationsDB.find(user!.id);
    return Response.json(data);
}
