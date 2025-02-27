import { render, screen, fireEvent } from "@testing-library/react";
import ChatItemMessageInput from "@/components/chat/chat-item-message-input";
import { useTyping } from "@ably/chat";

const sendMock = jest.fn();

jest.mock("lucide-react", () => ({
    // eslint-disable-next-line
    Smile: (props: any) => <div data-testid="mock-icon" {...props} />,
    // eslint-disable-next-line
    Send: (props: any) => <div data-testid="mock-icon" {...props} />,
}));
jest.mock("@ably/chat", () => ({
    useMessages: jest.fn(() => ({ send: sendMock })),
    useTyping: jest.fn(),
}));
jest.mock("@clerk/nextjs", () => ({
    useUser: jest.fn(() => ({ user: { username: "testuser" } })),
}));

describe("ChatItemMessageInput", () => {
    it("should clear message input after user sends the message", () => {
        (useTyping as jest.Mock).mockReturnValue({
            start: jest.fn(),
            error: null,
        });

        render(<ChatItemMessageInput />);
        const input =
            screen.getByPlaceholderText<HTMLInputElement>("Type a message");
        const sendButton = screen.getByRole("button", { name: "send-btn" });

        fireEvent.change(input, { target: { value: "Hello" } });
        fireEvent.click(sendButton);

        expect(input.value).toBe("");
    });

    it("should send message (call send method)", () => {
        render(<ChatItemMessageInput />);
        const input = screen.getByPlaceholderText("Type a message");
        const sendButton = screen.getByRole("button", { name: "send-btn" });

        fireEvent.change(input, { target: { value: "Hello" } });
        fireEvent.click(sendButton);

        expect(sendMock).toHaveBeenCalledWith({ text: "Hello" });
    });
});
