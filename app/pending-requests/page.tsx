import { prismaClient } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { FriendRequestCard } from "@/components/friend-request-card";

export default async function FriendRequests() {
    const loggedInUser = await currentUser();
    if (loggedInUser === null) {
        return <p>No pending requests</p>;
    }

    // Get friend requests from db
    const data = await prismaClient.user.findFirst({
        where: { clerk_id: loggedInUser.id },
        select: {
            friendRequestsReceived: {
                select: {
                    id: true,
                    sent_by_id: true,
                    sent_to_id: true,
                    sent_by: {
                        select: {
                            fullname: true,
                            username: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });

    return (
        <div className="w-full max-w-lg mx-auto p-4">
            <h1 className="text-center text-3xl p-4 font-bold mb-4">
                Friend Requests
            </h1>
            <ul className="space-y-4">
                {data && data.friendRequestsReceived.length > 0 ? (
                    data.friendRequestsReceived.map((friendRequest) => (
                        <FriendRequestCard
                            request={friendRequest}
                            key={friendRequest.id}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">
                        No pending requests
                    </p>
                )}
            </ul>
        </div>
    );
}
