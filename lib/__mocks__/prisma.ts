export const prismaClient = {
    user: {
        findUnique: jest.fn(),
        update: jest.fn(),
    },
    friendRequests: {
        create: jest.fn(),
        findFirst: jest.fn(),
        delete: jest.fn(),
    },
    fcmToken: {
        findMany: jest.fn(),
    },
};
