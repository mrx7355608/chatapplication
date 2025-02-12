"use server";

import { currentUser } from "@clerk/nextjs/server";
import { sendNotification } from "@/lib/notifications-service";
import { usersDB } from "@/data/users.data";
import { friendRequestsDB } from "@/data/friend-requests.data";
import { fcmTokensDB } from "@/data/fcm-tokens.data";

export async function sendFriendRequest(receiverId: string) {
    /* Check if user is authenticated */
    const loggedInUser = await currentUser();

    /* Get current user's mongoId from clerk's private metadata */
    const senderMongoId = loggedInUser?.privateMetadata.mongoId as string;
    if (!senderMongoId) {
        return { error: "Please login to continue" };
    }

    // Check if user has already sent a friend request
    const existingRequest = await friendRequestsDB.findBySenderReceiver(
        senderMongoId,
        receiverId,
    );
    if (existingRequest) {
        return {
            error: "A request is already pending",
        };
    }

    //  Check if the "receiver" is already a friend of current user
    const sender = await usersDB.findById(senderMongoId);
    const isFriend =
        sender?.my_friends_ids.includes(receiverId) ||
        sender?.iam_friends_with_ids.includes(receiverId);
    if (isFriend) {
        return { error: "Cannot send request to an existing friend" };
    }

    // Make a FriendRequest record in db
    await friendRequestsDB.create(senderMongoId, receiverId);

    /* Send notification to each device, the user is currently active */
    const fcmTokens = await fcmTokensDB.find(receiverId);
    for (const tokenData of fcmTokens) {
        const { token } = tokenData;
        const title = "New friend request";
        const body = `${sender?.fullname} has sent you a friend request`;
        await sendNotification(token, title, body);
    }

    return { ok: true };
}
