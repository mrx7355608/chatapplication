import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prismaClient } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.WEBHOOK_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error(
            "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
        );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error: Missing Svix headers", {
            status: 400,
        });
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Verify payload with headers
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

    // Do something with payload
    // For this guide, log payload to console

    if (evt.type === "user.created") {
        console.log("Creating user...");
        const { id, first_name, last_name, image_url, username } = evt.data;
        try {
            const user = await prismaClient.user.create({
                data: {
                    username: username || "Anonymous",
                    fullname: `${first_name} ${last_name}`,
                    image: image_url,
                    clerk_id: id,
                },
            });

            const client = await clerkClient();
            await client.users.updateUser(id, {
                privateMetadata: {
                    mongoId: user.id,
                },
            });
        } catch (err: any) {
            console.log(err.stack);
            return new Response("Webhook received", { status: 200 });
        }
    } else if (evt.type === "user.updated") {
        console.log("Updating user...");
        const { mongoId } = evt.data.private_metadata;
        const { first_name, last_name, image_url } = evt.data;
        try {
            await prismaClient.user.update({
                where: { id: mongoId as string },
                data: {
                    fullname: `${first_name} ${last_name}`,
                    image: image_url,
                },
            });
        } catch (err: any) {
            console.log(err.stack);
        }
    } else if (evt.type === "user.deleted") {
        console.log("Deleting user...");
        try {
            const { id } = evt.data;
            const userToDelete = await prismaClient.user.findFirst({
                where: { clerk_id: id },
            });
            if (userToDelete) {
                await prismaClient.user.delete({
                    where: { id: userToDelete.id },
                });
            }
        } catch (err: any) {
            console.log(err.stack);
        }
    }

    return new Response("Webhook received", { status: 200 });
}
