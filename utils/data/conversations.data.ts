import { prismaClient } from "@/lib/prisma";

const create = async (userId: string, friendId: string) => {
    const convo = await prismaClient.conversation.create({
        data: {
            user1_id: userId,
            user2_id: friendId,
        },
    });
    return convo;
};

const find = async (userId: string) => {
    const conversations = await prismaClient.conversation.findMany({
        where: {
            OR: [
                {
                    user1_id: userId,
                },
                {
                    user2_id: userId,
                },
            ],
        },
        select: {
            id: true,
            user1: {
                select: {
                    id: true,
                    fullname: true,
                    username: true,
                    image: true,
                },
            },
            user2: {
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
