import { Send } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { useMessages, useTyping } from "@ably/chat";
import { useUser } from "@clerk/nextjs";

export default function ChatItemMessageInput() {
    const [message, setMessage] = useState("");
    const [typingUser, setTypingUser] = useState("");

    const { user } = useUser();
    const { send } = useMessages();
    const { start, error } = useTyping({
        listener: ({ currentlyTyping }) => {
            if (currentlyTyping.size < 1) {
                setTypingUser("");
                return;
            }
            currentlyTyping.forEach((username) => {
                setTypingUser(username !== user?.username ? username : "");
            });
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMessage(value);
        start();
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        send({ text: message });
        setMessage("");
    };

    return (
        <>
            {/* Typing indicator */}
            <div className="w-full px-4">
                {error && <p className="text-error">{error.message}</p>}
                {typingUser && <p>{typingUser} is typing...</p>}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-[#f0f2f5] w-full">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="input input-bordered border w-full flex-1"
                        value={message}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="btn btn-success btn-square"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </>
    );
}
