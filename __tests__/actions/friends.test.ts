import { sendFriendRequest } from "@/actions/friends";
import { currentUser } from "@clerk/nextjs/server";
import { prismaClient } from "../../lib/prisma";

// Mocks
jest.mock("@clerk/nextjs/server", () => ({
    currentUser: jest.fn().mockResolvedValue({
        username: "John doe",
    }),
}));
jest.mock("../../lib/prisma");

// Mock data
const mockFriendRequest = {
    sent_by_id: "user_123",
    sent_to_id: "user_456",
};

const friendID = "67a506847f2df7011c72c01b";
const mockUser = {
    username: "John Doe",
    my_friends_ids: [],
    iam_friends_with_ids: [friendID],
};
const mockUserWithNoFriends = {
    username: "John Doe",
    my_friends_ids: [],
    iam_friends_with_ids: [],
};

describe("Server actions test", () => {
    // Reset all mocks before each test so that the tests are not affected by the
    // previous mocks states and behave as expected
    beforeEach(() => {
        jest.resetAllMocks();
        (currentUser as jest.Mock).mockResolvedValue(mockUser);
    });

    describe("Send Friend Request", () => {
        it("should return error for un-authenticated user", async () => {
            (currentUser as jest.Mock).mockResolvedValue(null);
            const response = await sendFriendRequest(friendID);
            expect(response.error).toBe("Not authenticated");
        });

        it("should return error if sender is not found", async () => {
            (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(null);
            const response = await sendFriendRequest(friendID);
            expect(response.error).toBe("Account not found");
        });

        it("should return error if user tries to send multiple requests to the same friend", async () => {
            (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(
                mockUser,
            );
            (
                prismaClient.friendRequests.findFirst as jest.Mock
            ).mockResolvedValueOnce(mockFriendRequest);

            const response = await sendFriendRequest(friendID);
            expect(response.error).toBe("A request is already pending");
        });

        it("should return error if user tries to send request to an existing friend", async () => {
            (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(
                mockUser,
            );
            (
                prismaClient.friendRequests.findFirst as jest.Mock
            ).mockResolvedValueOnce(null);

            const response = await sendFriendRequest(friendID);
            expect(response.error).toBe(
                "Cannot send request to an existing friend",
            );
        });
        it("should send a friend request", async () => {
            (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(
                mockUserWithNoFriends,
            );
            (prismaClient.friendRequests.create as jest.Mock).mockResolvedValue(
                mockFriendRequest,
            );
            const response = await sendFriendRequest(friendID);
            expect(response.ok).toBe(true);
        });
    });
});
