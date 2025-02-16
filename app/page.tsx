import { auth } from "@clerk/nextjs/server";
import { conversationsDB } from "@/utils/data/conversations.data";
import ChatHandler from "@/components/chat/chat-handler";
import { usersDB } from "@/utils/data/users.data";

export default async function Home() {
    const { userId } = await auth();

    if (!userId) {
        return <p>Not authenticated</p>;
    }

    /*
     * Here, User is fetched from my database using his clerk id because, when a new user
     * signs up, his mongoId is not yet present in the "privateMetadata" object. Because
     * clerk initiates a webhook for "user.created" event on signup which adds user to my
     * database and then I add mongoId in the "privateMetadata" of clerk's user
     *
     * See: app/api/webhook/route.ts
     */
    const user = await usersDB.findByClerkId(userId);
    const conversations = await conversationsDB.find(user!.clerk_id);

    return <ChatHandler chats={conversations} />;
}
