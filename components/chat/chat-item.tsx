"use client";
import Image from "next/image";
import { Send } from "lucide-react";
import { useMessages, usePresence } from "@ably/chat";
import { IMember } from "@/types/conversation-types";
import { useEffect, ChangeEvent, useState, useRef } from "react";

export default function ChatItem({ friend }: { friend: IMember }) {
    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const { isPresent } = usePresence();
    console.log(isPresent);

    const { send } = useMessages({
        listener: (event) => {
            setMessagesList([...messagesList, event.message.text]);
        },
    });

    /* Event handlers */
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
        <div className="flex flex-col h-screen bg-[#f0f2f5] w-full">
            {/* Chat header */}
            <div className="bg-[#075e54] text-white p-4 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
                    <Image
                        src={friend.image}
                        alt="user avatar"
                        className="rounded-full"
                        width={80}
                        height={80}
                    />
                </div>
                <div>
                    <h2 className="font-semibold">{friend.fullname}</h2>
                    <p className="text-xs">
                        {isPresent ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 w-full">
                {messagesList.map((message, idx) => (
                    <div key={idx} className="chat chat-end">
                        <div className="chat-bubble">{message}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
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
        </div>
    );
}
