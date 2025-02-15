import { prismaClient } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Deleting token...");
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    /* Get mongoID of currently logged in user */
    const userMongoId = loggedInUser.privateMetadata.mongoId as string;

    try {
        const { token } = await req.json();
        console.log({ token, userMongoId });
        if (!token) {
            return Response.json({ error: "Invalid token" }, { status: 400 });
        }

        /* Check if token already exists */
        const existingToken = await prismaClient.fcmToken.findFirst({
            where: { token, user_id: userMongoId },
        });
        if (!existingToken) {
            return Response.json({ error: "Token not found" }, { status: 404 });
        }

        /* Delete token */
        await prismaClient.fcmToken.delete({
            where: { id: existingToken.id },
        });

        return Response.json({ ok: true }, { status: 201 });
    } catch (err: any) {
        console.log(err.stack);
        return Response.json(
            { error: "Something went wrong!" },
            { status: 500 },
        );
    }
}
