"use server";

import { revalidatePath } from "next/cache";
import { prismaClient } from "@/lib/prisma";

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

        // 3. Revalidate the /pending-requests page to update the view
        revalidatePath("/pending-requests");
    } catch (err: any) {
        console.log(err.stack);
    }
}
