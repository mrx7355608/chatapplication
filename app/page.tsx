import ConversationsList from "@/components/conversation-list";
import NotificationsListener from "@/components/notifications-listener";

export default async function Home() {
    return (
        <div className="flex">
            <ConversationsList />
            <NotificationsListener />
        </div>
    );
}
