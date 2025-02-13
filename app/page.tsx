import { currentUser } from "@clerk/nextjs/server";
import { conversationsDB } from "@/data/conversations.data";
import ChatHandler from "@/components/chat/chat-handler";

export default async function Home() {
    const user = await currentUser();
    const userMongoId = user?.privateMetadata.mongoId as string;

    if (!userMongoId) {
        return <p>Not authenticated</p>;
    }

    const conversations = await conversationsDB.find(userMongoId);

    return <ChatHandler chats={conversations} />;
}
