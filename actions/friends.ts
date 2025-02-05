"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function sendFriendRequest(userId: string) {
    const loggedInUser = await currentUser();
    if (loggedInUser === null) {
        return { error: "Not authenticated" };
    }

    // Get MongoID of currently logged in user
    const sender = await prismaClient.user.findFirst({
        where: { clerk_id: loggedInUser.id },
    });
    if (sender === null) {
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
