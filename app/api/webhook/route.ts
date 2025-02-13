import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { usersDB } from "@/data/users.data";
import { checkHeaders } from "@/lib/webhook-utils";

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.WEBHOOK_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error(
            "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
        );
    }

    /* Check webhook headers */
    const { svix_id, svix_signature, svix_timestamp } = checkHeaders(req);

    /* Get body */
    const payload = await req.json();
    const body = JSON.stringify(payload);

    /* Create new Svix instance with secret */
    const wh = new Webhook(SIGNING_SECRET);
    let evt: WebhookEvent;

    /* Verify payload with headers */
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err: any) {
        console.error("Error: Could not verify webhook:", err.stack);
        return new Response("Error: Verification error", {
            status: 400,
        });
    }

    try {
        if (evt.type === "user.created") {
            /* Handle create event */
            console.log("Creating user...");
            const user = await usersDB.create(evt.data);

            /* Add user's mongoId in clerk's user metadata */
            const client = await clerkClient();
            await client.users.updateUser(evt.data.id, {
                privateMetadata: {
                    mongoId: user.id,
                },
            });
        } else if (evt.type === "user.updated") {
            /* Handle update event */
            console.log("Updating user...");
            const { mongoId } = evt.data.private_metadata;
            await usersDB.update(mongoId as string, evt.data);
        } else if (evt.type === "user.deleted") {
            /* Handle delete event */
            console.log("Deleting user...");
            if (evt.data.id) {
                const userToDelete = await usersDB.findByClerkId(evt.data.id);
                if (userToDelete) await usersDB.remove(userToDelete.id);
            }
        }
    } catch (err: any) {
        console.log(err.stack);
        return new Response("Webhook received", { status: 200 });
    }

    return new Response("Webhook received", { status: 200 });
}
