import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prismaClient = new PrismaClient();

export async function GET(req: NextRequest) {
  const usernameQuery = req.nextUrl.searchParams.get("username");
  if (!usernameQuery) {
    return Response.json(
      { error: "Please enter a username to search" },
      { status: 400 },
    );
  }

  const users = await prismaClient.user.findMany({
    where: { username: usernameQuery },
  });

  return Response.json({ data: users });
}
