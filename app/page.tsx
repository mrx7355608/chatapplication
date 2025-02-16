import { auth } from "@clerk/nextjs/server";
import { conversationsDB } from "@/utils/data/conversations.data";
import ChatHandler from "@/components/chat/chat-handler";
import { usersDB } from "@/utils/data/users.data";
import { IConversation } from "@/utils/types/conversation-types";

export default async function Home() {
    const { userId } = await auth();

    if (!userId) {
        return <p>Not authenticated</p>;
    }

    /*
     * Here, User is fetched from my database using his clerk id because, when a new user
     * signs up, his mongoId is not yet present in the "privateMetadata" object. Because
     * clerk initiates a webhook for "user.created" event on signup which adds user to my
     * database and then I add mongoId in the "privateMetadata" of clerk's user.
     * This whole process can take some time and is a RACE CONDITION
     *
     * See: app/api/webhook/route.ts
     */
    const user = await usersDB.findByClerkId(userId);

    /*
     * To handle above race condition, I will return an empty array of conversations,
     * indicating that user has not been saved in my database yet
     */
    let conversations: IConversation[] = [];
    if (user) {
        conversations = await conversationsDB.find(user!.id);
    }

    return <ChatHandler chats={conversations} />;
}
