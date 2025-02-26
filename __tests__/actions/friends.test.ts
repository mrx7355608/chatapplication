import {
    acceptRequest,
} from "@/app/pending-requests/actions/accept-request";

import {
    rejectRequest,
} from "@/app/pending-requests/actions/reject-request";
import {
    sendFriendRequest,
} from "@/app/add-users/actions/send-request";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { sendNotification } from "@/lib/notifications-service";
import { friendRequestsDB } from "@/data/friend-requests.data";
import { usersDB } from "@/data/users.data";
import { fcmTokensDB } from "@/data/fcm-tokens.data";
import { conversationsDB } from "@/data/conversations.data";

// Mocks
jest.mock("@clerk/nextjs/server", () => ({
    currentUser: jest.fn().mockResolvedValue({
        username: "John doe",
    }),
}));
jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}));
jest.mock("@/lib/notifications-service", () => ({
    sendNotification: jest.fn(),
}));
jest.mock("@/data/users.data");
jest.mock("@/data/fcm-tokens.data");
jest.mock("@/data/conversations.data");
jest.mock("@/data/friend-requests.data");

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
    privateMetadata: {
        mongoId: "some-mongo-id",
    },
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
        it("should return error if sender is not found", async () => {
            // Mocks
            (currentUser as jest.Mock).mockResolvedValue(null);

            // Call server action
            const response = await sendFriendRequest(friendID);

            // Assert
            expect(response.error).toBe("Please login to continue");
        });

        it("should return error if user tries to send multiple requests to the same friend", async () => {
            // Mocks
            (
                friendRequestsDB.findBySenderReceiver as jest.Mock
            ).mockResolvedValueOnce(mockFriendRequest);

            // Call server action
            const response = await sendFriendRequest(friendID);

            // Assert
            expect(response.error).toBe("A request is already pending");
        });

        it("should return error if user tries to send request to an existing friend", async () => {
            // Mocks
            (usersDB.findById as jest.Mock).mockResolvedValue(mockUser);
            (
                friendRequestsDB.findBySenderReceiver as jest.Mock
            ).mockResolvedValueOnce(null);

            // Call server action
            const response = await sendFriendRequest(friendID);

            // Assert
            expect(response.error).toBe(
                "Cannot send request to an existing friend"
            );
        });
        it("should send a friend request", async () => {
            // Mocks
            (usersDB.findById as jest.Mock).mockResolvedValue(
                mockUserWithNoFriends
            );
            (friendRequestsDB.create as jest.Mock).mockResolvedValue(
                mockFriendRequest
            );
            (fcmTokensDB.find as jest.Mock).mockResolvedValue([]);
            (sendNotification as jest.Mock).mockResolvedValue(undefined);

            // Call server action
            const response = await sendFriendRequest(friendID);

            // Assert
            expect(response.ok).toBe(true);
        });
    });

    describe("Accept Friend Request", () => {
        it("should remove friend request and update both user's friend-lists", async () => {
            // Mocks
            (friendRequestsDB.remove as jest.Mock).mockReturnValue({});
            (usersDB.update as jest.Mock).mockReturnValue({});
            (conversationsDB.create as jest.Mock).mockResolvedValue({});

            // Call server action with mock IDs
            await acceptRequest("sender_123", "receiver_123", "request_123");

            // Assertions
            // Check if pending request is being deleted or not
            expect(friendRequestsDB.remove).toHaveBeenCalledWith("request_123");

            // Check if friend-lists of both users are updated or not
            expect(usersDB.addFriend).toHaveBeenCalledWith(
                "receiver_123",
                "sender_123"
            );
            expect(usersDB.addMeAsFriend).toHaveBeenCalledWith(
                "sender_123",
                "receiver_123"
            );
            expect(usersDB.addFriend).toHaveBeenCalledTimes(1);
            expect(usersDB.addMeAsFriend).toHaveBeenCalledTimes(1);

            // Check if the path is being revalidated or not
            expect(revalidatePath).toHaveBeenCalledTimes(1);
            expect(revalidatePath).toHaveBeenCalledWith("/pending-requests");
        });
    });

    describe("Reject Friend Request", () => {
        it("should delete friend request when user rejects it", async () => {
            // Mocked necessary functions
            (friendRequestsDB.remove as jest.Mock).mockReturnValue({});

            // Call server action with mock request ID
            await rejectRequest("request_123");

            // Assert
            // Check if friend request is being deleted or not
            expect(friendRequestsDB.remove).toHaveBeenCalledWith("request_123");

            // Check if the path is being revalidated or not
            expect(revalidatePath).toHaveBeenCalledTimes(1);
            expect(revalidatePath).toHaveBeenCalledWith("/pending-requests");
        });
    });
});
