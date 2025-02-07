"use client";

import { sendFriendRequest } from "@/actions/friends";
import { Spinner } from "@/components/spinner";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface IUser {
    id: string;
    fullname: string;
    username: string;
    image: string;
    clerk_id: string;
}

export default function SearchFriends() {
    const [query, setQuery] = useState("");
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);

    const searchUser = async (e: FormEvent) => {
        e.preventDefault();

        // If searchQuery string is empty, then dont call api
        if (query.trim() === "") {
            return;
        }

        setLoading(true);
        const response = await fetch(`/api/search-users?username=${query}`);
        const result = await response.json();
        setUser(result.data);
        setLoading(false);
    };

    return (
        <div className="w-full max-w-lg mx-auto p-4">
            <h1 className="text-center text-3xl p-4 font-bold mb-4">
                Add Friends
            </h1>
            <form className="flex gap-2" onSubmit={searchUser}>
                <input
                    type="text"
                    placeholder="Search by username"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full input input-bordered rounded-xl mb-4"
                />
                <button
                    className="btn btn-neutral text-white rounded-xl"
                    disabled={loading}
                >
                    {loading ? <Spinner size="sm" /> : "Search"}
                </button>
            </form>
            {user ? (
                <UserCard user={user} />
            ) : (
                <p className="text-center text-gray-500 mt-4">No users found</p>
            )}
        </div>
    );
}

function UserCard({ user }: { user: IUser }) {
    const [loading, setLoading] = useState(false);
    const sendRequestWithId = sendFriendRequest.bind(user.id);
    const { addToast } = useToast();

    const handleOnClick = async () => {
        setLoading(true);
        const response = await sendRequestWithId(user.id);
        if (response.error) {
            addToast("error", response.error);
        } else if (response.ok) {
            addToast("success", "Request send successfully");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center gap-3 border p-3 px-4 shadow-sm rounded-lg">
            <Image
                src={user.image}
                width={60}
                height={60}
                alt="user"
                className="rounded-full object-fit"
            />
            <div>
                <p className="font-medium">{user.fullname}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
            </div>

            {/* ADD FRIEND BUTTON */}
            <button
                className="btn btn-outline btn-sm btn-ghost rounded-full ml-auto"
                onClick={handleOnClick}
                disabled={loading}
            >
                {loading ? <Spinner size="xs" /> : "Add friend"}
            </button>
        </div>
    );
}
