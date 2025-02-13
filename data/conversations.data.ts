import { prismaClient } from "@/lib/prisma";

const create = async (userId: string, friendId: string) => {
    const convo = await prismaClient.conversation.create({
        data: {
            members_ids: [userId, friendId],
            type: "PRIVATE",
        },
    });
    return convo;
};

const find = async (userId: string) => {
    const conversations = await prismaClient.conversation.findMany({
        where: {
            members_ids: {
                has: userId,
            },
        },
        select: {
            id: true,
            type: true,
            members: {
                select: {
                    id: true,
                    fullname: true,
                    username: true,
                    image: true,
                },
            },
        },
    });
    return conversations;
};

export const conversationsDB = { create, find };
