"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prismaClient = new PrismaClient();

export async function sendFriendRequest(userId: string) {
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
        return { error: "Not authenticated" };
    }

    // Get MongoID of currently logged in user
    const sender = await prismaClient.user.findFirst({
        where: { clerk_id: loggedInUser.id },
    });
    if (!sender) {
        return { error: "Account not found" };
    }

    // TODO: check if user has already sent a friend request

    // Make a FriendRequest record in db
    await prismaClient.friendRequests.create({
        data: {
            sent_by_id: sender.id,
            sent_to_id: userId,
        },
    });
    return { ok: true };
}

export async function acceptRequest(
    senderId: string,
    myId: string,
    friendRequestId: string,
) {
    // 1. Delete the pending request
    await prismaClient.friendRequests.delete({
        where: { id: friendRequestId },
    });

    try {
        // 2. Add the sender into my friends
        await prismaClient.user.update({
            where: { id: myId },
            data: {
                my_friends_ids: {
                    push: senderId,
                },
            },
        });

        // 3. Add me in sender's friends
        await prismaClient.user.update({
            where: { id: senderId },
            data: {
                iam_friends_with_ids: {
                    push: myId,
                },
            },
        });
    } catch (err: any) {
        console.log(err.stack);
    }

    // 3. Revalidate the /pending-requests page to update the view
    revalidatePath("/pending-requests");
}

export async function rejectRequest(friendRequestId: string) {
    try {
        // 1. Delete the pending request
        await prismaClient.friendRequests.delete({
            where: { id: friendRequestId },
        });

        // 2. Revalidate the /pending-requests page to update the view
        revalidatePath("/pending-requests");
    } catch (err: any) {
        console.log(err.stack);
    }
}
