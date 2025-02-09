"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prismaClient } from "@/lib/prisma";

export async function sendFriendRequest(receiverId: string) {
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
        return { error: "Not authenticated" };
    }

    // Get record of currently logged in user from MongoDB for his mongoID
    const sender = await prismaClient.user.findFirst({
        where: { clerk_id: loggedInUser.id },
    });
    if (!sender) {
        return { error: "Account not found" };
    }

    // Check if user has already sent a friend request
    const existingRequest = await prismaClient.friendRequests.findFirst({
        where: {
            sent_by_id: sender.id,
            sent_to_id: receiverId,
        },
    });
    if (existingRequest) {
        return {
            error: "A request is already pending",
        };
    }

    //  Check if the "receiver" is already a friend of current user
    const isFriend =
        sender.my_friends_ids.includes(receiverId) ||
        sender.iam_friends_with_ids.includes(receiverId);
    if (isFriend) {
        return { error: "Cannot send request to an existing friend" };
    }

    // Make a FriendRequest record in db
    await prismaClient.friendRequests.create({
        data: {
            sent_by_id: sender.id,
            sent_to_id: receiverId,
        },
    });

    return { ok: true };
}
