import { Send, Smile } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { useMessages, useTyping } from "@ably/chat";
import { useUser } from "@clerk/nextjs";
import EmojiPicker, {
    EmojiClickData,
    EmojiStyle,
    Theme,
} from "emoji-picker-react";

export default function ChatItemMessageInput() {
    const [message, setMessage] = useState("");
    const [typingUser, setTypingUser] = useState("");
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

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

    const handleEmojiChange = (e: EmojiClickData) => {
        setMessage(e.emoji);
        start();
    };

    const toggleEmojiPicker = () => setIsEmojiPickerOpen(!isEmojiPickerOpen);

    return (
        <>
            {/* Typing indicator */}
            {error && <p className="text-error">{error.message}</p>}
            {typingUser && (
                <div className="w-full flex items-center gap-3 px-4 py-2 rounded-t-lg bg-base-200">
                    <>
                        <span className="loading loading-dots loading-sm"></span>
                        <p>{typingUser} is typing...</p>
                    </>
                </div>
            )}

            {/* Message Input */}

            <form
                onSubmit={handleSubmit}
                className="relative p-3 pb-4 bg-base-100 w-full border border-x-0 border-b-0 border-neutral"
            >
                <EmojiPicker
                    open={isEmojiPickerOpen}
                    onEmojiClick={handleEmojiChange}
                    theme={Theme.DARK}
                    lazyLoadEmojis={true}
                    emojiStyle={EmojiStyle.TWITTER}
                    skinTonesDisabled={true}
                    style={{ position: "absolute", bottom: 70, left: 0 }}
                />
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        className="btn btn-square btn-ghost rounded-md"
                        onClick={toggleEmojiPicker}
                    >
                        <Smile size={23} />
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="input bg-base-200 input-bordered rounded-md w-full flex-1"
                        value={message}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="btn btn-info btn-square rounded-md"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </>
    );
}
