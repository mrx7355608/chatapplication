import { prismaClient } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Saving token...");
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const { token } = await req.json();

        /* Check if token already exists */
        const existingToken = await prismaClient.fcmToken.findFirst({
            where: { token, user_clerk_id: loggedInUser.id },
        });
        if (existingToken) {
            return Response.json(
                { error: "Token already exists" },
                { status: 400 },
            );
        }

        /* Save token */
        await prismaClient.fcmToken.create({
            data: {
                user_clerk_id: loggedInUser.id,
                token: token,
            },
        });
    } catch (err) {
        console.log((err as Error).stack);
        return Response.json(
            { error: "Something went wrong!" },
            { status: 500 },
        );
    }

    return Response.json({ ok: true }, { status: 201 });
}
