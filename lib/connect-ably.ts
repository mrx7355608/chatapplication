import { ChatClient } from "@ably/chat";
import { Realtime } from "ably";

let ably: Realtime;
let chatClient: ChatClient;

export function connectAbly() {
    if (!ably) {
        console.log("Created new ably instance");
        ably = new Realtime({
            authUrl: "http://localhost:3000/api/ably-authenticate",
        });
    }

    return ably;
}

export function getChatClient() {
    if (!ably) {
        connectAbly();
    }

    if (chatClient) {
        return chatClient;
    }

    chatClient = new ChatClient(ably);
    return chatClient;
}
