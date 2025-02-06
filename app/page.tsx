import ConversationsList from "@/components/conversation-list";

export default async function Home() {
    return (
        <div className="flex">
            <ConversationsList />
            <h1>Hello</h1>
        </div>
    );
}
