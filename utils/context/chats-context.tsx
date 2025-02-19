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
import useConnectionManager from "../hooks/useConnection";

interface IChatsContext {
    loading: boolean;
    chats: IConversation[];
}
const ChatsContext = createContext<IChatsContext>({
    loading: false,
    chats: [],
});

export const useChats = () => useContext(ChatsContext);

export const ChatsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<IConversation[]>([]);
    const [loading, setLoading] = useState(true);
    const { client } = useConnectionManager();
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
            {children}
        </ChatsContext.Provider>
    );
};
