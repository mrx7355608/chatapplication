export const prismaClient = {
    user: {
        findFirst: jest.fn(),
        update: jest.fn(),
    },
    friendRequests: {
        create: jest.fn(),
        findFirst: jest.fn(),
        delete: jest.fn(),
    },
};
