import { prismaClient } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    /* Get mongoID of currently logged in user using his clerk id */
    const userMongoId = loggedInUser.privateMetadata.mongoId as string;

    const { token } = await req.json();

    /* Check if token already exists */
    const existingToken = await prismaClient.fcmToken.findFirst({
        where: { token },
    });
    if (existingToken) {
        return Response.json(
            { error: "Token already exists" },
            { status: 400 },
        );
    }

    /* Save token */
    try {
        await prismaClient.fcmToken.create({
            data: {
                user_id: userMongoId,
                token: token,
            },
        });
    } catch (err: any) {
        console.log(err.stack);
        return Response.json(
            { error: "Something went wrong!" },
            { status: 500 },
        );
    }

    return Response.json({ ok: true }, { status: 201 });
}
