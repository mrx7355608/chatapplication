import React from "react";

export default function ChatSkeletonLoading() {
    return (
        <div className="flex w-full flex-col p-3">
            <div className="flex items-center gap-3">
                <div className="skeleton h-14 w-14 shrink-0 rounded-full bg-neutral"></div>
                <div className="flex flex-col gap-3">
                    <div className="skeleton h-3.5 w-24 bg-neutral"></div>
                    <div className="skeleton h-2 w-52 bg-neutral"></div>
                </div>
            </div>
        </div>
    );
}
