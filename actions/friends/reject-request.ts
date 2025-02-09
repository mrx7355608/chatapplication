"use server";

import { revalidatePath } from "next/cache";
import { prismaClient } from "@/lib/prisma";

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
