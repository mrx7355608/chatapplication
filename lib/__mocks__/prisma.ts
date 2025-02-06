export const prismaClient = {
    user: {
        findFirst: jest.fn(),
    },
    friendRequests: {
        create: jest.fn(),
        findFirst: jest.fn(),
    },
};
