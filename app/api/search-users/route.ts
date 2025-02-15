import { usersDB } from "@/utils/data/users.data";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    await auth.protect();

    const usernameQuery = req.nextUrl.searchParams.get("username");
    if (!usernameQuery) {
        return Response.json(
            { error: "Please enter a username to search" },
            { status: 400 },
        );
    }

    const user = await usersDB.findByUsername(usernameQuery);
    if (!user) {
        return Response.json({ data: null }, { status: 404 });
    }

    return Response.json({ data: user });
}
