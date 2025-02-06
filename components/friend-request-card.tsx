"use client";
import Image from "next/image";
import { acceptRequest, rejectRequest } from "@/actions/friends";
import { useState } from "react";
import { Spinner } from "./Spinner";

interface IFriendRequestSender {
    fullname: string;
    username: string;
    image: string;
}
interface Props {
    request: {
        id: string;
        sent_by: IFriendRequestSender;
        sent_by_id: string;
        sent_to_id: string;
    };
}

export const FriendRequestCard = ({ request }: Props) => {
    const sender = request.sent_by;
    const { sent_by_id, sent_to_id, id } = request;
    const [loading, setLoading] = useState({
        accepting: false,
        rejecting: false,
    });

    const accept = async () => {
        setLoading({ ...loading, accepting: true });
        await acceptRequest(sent_by_id, sent_to_id, id);
        setLoading({ ...loading, accepting: false });
    };

    const reject = async () => {
        setLoading({ ...loading, rejecting: true });
        await rejectRequest(id);
        setLoading({ ...loading, rejecting: false });
    };

    return (
        <li className="flex flex-col items-center gap-4 border p-4 shadow-sm rounded-lg">
            <div className="flex items-center w-full gap-3">
                <Image
                    src={sender.image}
                    width={60}
                    height={60}
                    alt="user"
                    className="rounded-full object-fit"
                />
                <div>
                    <p className="font-medium">{sender.fullname}</p>
                    <p className="text-sm text-gray-500">@{sender.username}</p>
                </div>
            </div>

            <div className="flex gap-2 w-full">
                <button
                    className="btn rounded-lg btn-neutral text-white btn-sm flex-1"
                    onClick={accept}
                    disabled={loading.accepting}
                >
                    {loading.accepting ? <Spinner size="sm" /> : "Accept"}
                </button>
                <button
                    className="btn rounded-lg btn-ghost bg-gray-100 btn-sm flex-1"
                    disabled={loading.rejecting}
                    onClick={reject}
                >
                    {loading.rejecting ? <Spinner size="sm" /> : "Reject"}
                </button>
            </div>
        </li>
    );
};
