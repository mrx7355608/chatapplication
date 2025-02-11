import { prismaClient } from "@/lib/prisma";
import { UserJSON } from "@clerk/nextjs/server";

const findUserByClerkId = async (clerkId: string) => {
    const user = await prismaClient.user.findFirst({
        where: { clerk_id: clerkId },
    });
    return user;
};

const createUser = async (data: UserJSON) => {
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

const updateUser = async (mongoId: string, data: UserJSON) => {
    const { first_name, last_name, image_url } = evt.data;
    const updatedUser = await prismaClient.user.update({
        where: { id: mongoId as string },
        data: {
            fullname: `${first_name} ${last_name}`,
            image: image_url,
        },
    });
    return updatedUser;
};

const deleteUser = async (userId: string) => {
    await prismaClient.user.delete({
        where: { id: userId },
    });
};

export { findUserByClerkId, createUser, updateUser, deleteUser };
