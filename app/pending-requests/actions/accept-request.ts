"use server";

import { revalidatePath } from "next/cache";
import { friendRequestsDB } from "@/data/friend-requests.data";
import { usersDB } from "@/data/users.data";
import { conversationsDB } from "@/data/conversations.data";

export async function acceptRequest(
    senderId: string,
    myId: string,
    friendRequestId: string
) {
    // 1. Delete the pending request
    await friendRequestsDB.remove(friendRequestId);

    try {
        // 2. Add the sender into my friends
        await usersDB.addFriend(myId, senderId);

        // 3. Add me in sender's friends
        await usersDB.addMeAsFriend(senderId, myId);

        // 4. Create a conversation
        await conversationsDB.create(myId, senderId);

        // 5. Revalidate the /pending-requests page to update the view
        revalidatePath("/pending-requests");
    } catch (err) {
        console.log((err as Error).stack);
    }
}
