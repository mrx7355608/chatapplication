import ConversationsList from "@/components/ConversationList";
import VerticalNavbar from "@/components/VerticalNavbar";

export default function Home() {
  return (
    <div className="flex">
      <VerticalNavbar />
      <ConversationsList />
      <h1>Hello</h1>
    </div>
  );
}
