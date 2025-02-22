"use server";

import { revalidatePath } from "next/cache";
import { friendRequestsDB } from "@/data/friend-requests.data";

export async function rejectRequest(requestId: string) {
    try {
        // 1. Delete the pending request
        await friendRequestsDB.remove(requestId);

        // 2. Revalidate the /pending-requests page to update the view
        revalidatePath("/pending-requests");
    } catch (err) {
        console.log((err as Error).stack);
    }
}
