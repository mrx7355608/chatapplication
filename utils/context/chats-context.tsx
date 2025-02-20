"use client";

import {
    ReactNode,
    FC,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import { IConversation } from "../types/conversation-types";
import { ChatClient, ChatClientProvider } from "@ably/chat";
import { Realtime } from "ably";

interface IChatsContext {
    loading: boolean;
    chats: IConversation[];
}
const ChatsContext = createContext<IChatsContext>({
    loading: false,
    chats: [],
});

export const useChats = () => useContext(ChatsContext);

const ably = new Realtime({
    authUrl: "http://localhost:3000/api/ably-authenticate",
});
const client = new ChatClient(ably);

export const ChatsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<IConversation[]>([]);
    const [loading, setLoading] = useState(true);

    const roomOptions = {
        presence: { enter: true },
    };

    useEffect(() => {
        fetch("/api/chats", { credentials: "include" })
            .then((resp) => resp.json())
            .then(async (data) => await handleResponse(data))
            .catch(console.error)
            .finally(() => setLoading(false));

        async function handleResponse(data: IConversation[]) {
            const room = await client.rooms.get("online-users", roomOptions);
            room.presence.enter();
            setChats(data);
        }

        async function goOffline() {
            const room = await client.rooms.get("online-users", roomOptions);
            room.presence.leave();
        }

        return () => {
            goOffline();
        };
    }, []);

    return (
        <ChatsContext.Provider value={{ loading, chats }}>
            <ChatClientProvider client={client}>{children}</ChatClientProvider>
        </ChatsContext.Provider>
    );
};
