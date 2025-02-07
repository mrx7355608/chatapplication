import ConversationsList from "@/components/conversation-list";
import Notifications from "@/components/notifications";

export default async function Home() {
    return (
        <div className="flex">
            <ConversationsList />
            <Notifications />
        </div>
    );
}
