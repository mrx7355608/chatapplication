import { useMessages } from "@ably/chat";
import { useState, ChangeEvent } from "react";
import { Send } from "lucide-react";

export default function ChatItemMessageInput() {
    const [message, setMessage] = useState("");

    const { send } = useMessages();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMessage(value);
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        send({ text: message });
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-[#f0f2f5] w-full">
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Type a message"
                    className="input input-bordered border w-full flex-1"
                    value={message}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-success btn-square">
                    <Send size={20} />
                </button>
            </div>
        </form>
    );
}
