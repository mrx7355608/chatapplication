"use client";

import React from "react";
import NavButton from "./nav-button";
import { MessageCircle, Settings, Clock, UserPlus, Menu } from "lucide-react";
import CustomClerkMenu from "./custom-clerk-menu";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function MobileNavbar() {
    const { user } = useUser();

    return (
        <div className="lg:hidden">
            {/* Page content here */}
            <div className="flex border border-x-0 border-t-0 border-neutral rounded-b-lg items-center shadow-xl justify-between w-full px-6 py-2">
                <Link href="/">
                    <h2 className="text-2xl font-black">Whipser</h2>
                </Link>
                <label htmlFor="my-drawer-4" className="btn btn-ghost">
                    <Menu size={20} />
                </label>
            </div>
            <div className="drawer drawer-end p-0 m-0 w-0 h-0">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-side z-20">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-1">
                        <h2 className="font-bold text-2xl ml-2 my-4">Menu</h2>
                        <div className="p-2 w-full flex items-center gap-3">
                            <CustomClerkMenu />
                            <p className="font-medium">{user?.fullName}</p>
                        </div>
                        <NavButton
                            icon={MessageCircle}
                            label="Chats"
                            url="/"
                            showForMobile
                        />
                        <NavButton
                            icon={UserPlus}
                            label="Add Friends"
                            url="/add-users"
                            showForMobile
                        />
                        <NavButton
                            icon={Clock}
                            label="Pending Requests"
                            url="/pending-requests"
                            showForMobile
                        />
                        <NavButton
                            icon={Settings}
                            label="Settings"
                            url="/settings"
                            showForMobile
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}
