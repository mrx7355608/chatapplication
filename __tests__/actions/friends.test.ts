import { sendFriendRequest } from "@/actions/friends";

// Mock clerkjs
jest.mock("@clerk/nextjs/server", () => ({
    currentUser: jest.fn().mockReturnValueOnce(Promise.resolve(null)),
}));

describe("Server actions test", () => {
    describe("Send Friend Request", () => {
        it("should return error for un-authenticated user", async () => {
            const friendID = "fasdfasfas"; // FIXME: make friendID a valid mongodb ID
            const response = await sendFriendRequest(friendID);
            expect(response.error).toBe("Not authenticated");
        });

        it.todo("should return error sender is not found");
        it.todo("should create a pending request record in database");
    });
});
