import ConversationsList from "@/components/ConversationList";

export default async function Home() {
    return (
        <div className="flex">
            <ConversationsList />
            <h1>Hello</h1>
        </div>
    );
}
