"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prismaClient } from "@/lib/prisma";
import { sendNotification } from "@/lib/notifications-service";

export async function sendFriendRequest(receiverId: string) {
    /* Check if user is authenticated */
    const loggedInUser = await currentUser();

    /* Get current user's mongoId from clerk's private metadata */
    const senderId = loggedInUser?.privateMetadata.mongoId as string;
    if (!senderId) {
        return { error: "Please login to continue" };
    }

    // Check if user has already sent a friend request
    const existingRequest = await prismaClient.friendRequests.findFirst({
        where: {
            OR: [
                {
                    sent_by_id: senderId,
                    sent_to_id: receiverId,
                },
                {
                    sent_by_id: receiverId,
                    sent_to_id: senderId,
                },
            ],
        },
    });
    if (existingRequest) {
        return {
            error: "A request is already pending",
        };
    }

    //  Check if the "receiver" is already a friend of current user
    const sender = await prismaClient.user.findUnique({
        where: { id: senderId },
    });
    const isFriend =
        sender?.my_friends_ids.includes(receiverId) ||
        sender?.iam_friends_with_ids.includes(receiverId);
    if (isFriend) {
        return { error: "Cannot send request to an existing friend" };
    }

    // Make a FriendRequest record in db
    await prismaClient.friendRequests.create({
        data: {
            sent_by_id: senderId,
            sent_to_id: receiverId,
        },
    });

    /* Send notification to each device, the user is currently active */
    const fcmTokens = await prismaClient.fcmToken.findMany({
        where: { user_id: receiverId },
    });
    for (const tokenData of fcmTokens) {
        const { token } = tokenData;
        const title = "New friend request";
        const body = `${sender?.fullname} has sent you a friend request`;
        await sendNotification(token, title, body);
    }

    return { ok: true };
}
