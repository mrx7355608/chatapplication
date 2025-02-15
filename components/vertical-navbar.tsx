"use client";

import Link from "next/link";
import { useState } from "react";
import { Spinner } from "./spinner";
import { LogOut } from "lucide-react";
import { SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import { MessageCircle, Settings, Clock, UserPlus } from "lucide-react";

const VerticalNavbar = () => {
    const { signOut } = useAuth();
    const [loading, setLoading] = useState(false);

    const customLogout = async () => {
        try {
            setLoading(true);
            const oldToken = localStorage.getItem("fcm-token");
            if (!oldToken) {
                await signOut();
                return;
            }

            /* Remove token from database */
            await fetch("/api/remove-tokens", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: oldToken,
                }),
            });

            /* Remove token from local storage */
            localStorage.removeItem("fcm-token");

            /* Execute clerk's signOut() */
            await signOut();
        } catch (err: any) {
            console.log("Error:", err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <nav className="flex flex-col items-center w-20 h-screen py-8 space-y-6 border-r border-gray-700 bg-base-200">
            {/* User Profile */}
            <SignedIn>
                {loading ? (
                    <Spinner size="md" />
                ) : (
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonPopoverActionButton__signOut:
                                    "hidden",
                            },
                        }}
                    >
                        <UserButton.MenuItems>
                            <UserButton.Action label="manageAccount" />
                            <UserButton.Action
                                label="Sign out"
                                labelIcon={<LogOut size={15} />}
                                onClick={customLogout}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                )}
            </SignedIn>

            {/* Chats */}
            <NavButton icon={MessageCircle} label="Chats" url="/" />

            {/* Add friends */}
            <NavButton icon={UserPlus} label="Add Friends" url="/add-users" />

            {/* Pending Requests */}
            <NavButton
                icon={Clock}
                label="Pending Requests"
                url="/pending-requests"
            />

            {/* Settings */}
            <NavButton icon={Settings} label="Settings" url="/settings" />
        </nav>
    );
};

const NavButton = ({
    icon: Icon,
    label,
    url,
}: {
    icon: React.ElementType;
    label: string;
    url: string;
}) => (
    <Link href={url}>
        <button className="btn btn-square btn-ghost">
            <Icon size={25} />
            <span className="absolute left-full ml-4 px-2 py-0 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                {label}
            </span>
        </button>
    </Link>
);

export default VerticalNavbar;
