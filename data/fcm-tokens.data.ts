import { prismaClient } from "@/lib/prisma";

const find = async (receiverId: string) => {
    const tokens = await prismaClient.fcmToken.findMany({
        where: { user_clerk_id: receiverId },
    });

    return tokens;
};

export const fcmTokensDB = { find };
