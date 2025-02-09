import { prismaClient } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const usernameQuery = req.nextUrl.searchParams.get("username");
    if (!usernameQuery) {
        return Response.json(
            { error: "Please enter a username to search" },
            { status: 400 },
        );
    }

    const users = await prismaClient.user.findFirst({
        where: { username: usernameQuery },
    });

    return Response.json({ data: users });
}
