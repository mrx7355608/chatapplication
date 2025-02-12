import { prismaClient } from "@/lib/prisma";

const create = async (senderId: string, receiverId: string) => {
    const request = await prismaClient.friendRequests.create({
        data: {
            sent_by_id: senderId,
            sent_to_id: receiverId,
        },
    });
    return request;
};

const findBySenderReceiver = async (senderId: string, receiverId: string) => {
    const existingRequest = await prismaClient.friendRequests.findFirst({
        where: {
            OR: [
                {
                    sent_by_id: senderId,
                    sent_to_id: receiverId,
                },
                {
                    sent_by_id: receiverId,
                    sent_to_id: senderId,
                },
            ],
        },
    });
    return existingRequest;
};

const remove = async (requestId: string) => {
    await prismaClient.friendRequests.delete({
        where: { id: requestId },
    });
};

export const friendRequestsDB = { create, findBySenderReceiver, remove };
