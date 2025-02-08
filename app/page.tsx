import ConversationsList from "@/components/conversation-list";

export default async function Home() {
    return (
        <div className="flex">
            <ConversationsList />
        </div>
    );
}
