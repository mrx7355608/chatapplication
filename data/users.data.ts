import { prismaClient } from "@/lib/prisma";
import { UserJSON } from "@clerk/nextjs/server";

const findByClerkId = async (clerkId: string) => {
    const user = await prismaClient.user.findFirst({
        where: { clerk_id: clerkId },
    });
    return user;
};

const findById = async (id: string) => {
    const user = await prismaClient.user.findUnique({
        where: { id },
    });
    return user;
};

const create = async (data: UserJSON) => {
    const { id, first_name, last_name, image_url, username } = data;
    const user = await prismaClient.user.create({
        data: {
            username: username || "Anonymous",
            fullname: `${first_name} ${last_name}`,
            image: image_url,
            clerk_id: id,
        },
    });
    return user;
};

const update = async (mongoId: string, data: UserJSON) => {
    const { first_name, last_name, image_url } = data;
    const updatedUser = await prismaClient.user.update({
        where: { id: mongoId as string },
        data: {
            fullname: `${first_name} ${last_name}`,
            image: image_url,
        },
    });
    return updatedUser;
};

const remove = async (userId: string) => {
    await prismaClient.user.delete({
        where: { id: userId },
    });
};

const addFriend = async (userId: string, friendId: string) => {
    await prismaClient.user.update({
        where: { id: userId },
        data: {
            my_friends_ids: {
                push: friendId,
            },
        },
    });
};

const addMeAsFriend = async (userId: string, friendId: string) => {
    await prismaClient.user.update({
        where: { id: friendId },
        data: {
            iam_friends_with_ids: {
                push: userId,
            },
        },
    });
};

export const usersDB = {
    findByClerkId,
    findById,
    create,
    update,
    remove,
    addFriend,
    addMeAsFriend,
};
