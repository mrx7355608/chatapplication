"use client";

import { MessageCircle, Settings, Clock, UserPlus } from "lucide-react";
import { SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";

const VerticalNavbar = () => {
    const { signOut } = useAuth();

    const customLogout = async () => {
        const oldToken = localStorage.getItem("fcm-token");
        if (!oldToken) {
            await signOut();
            return;
        }

        await fetch("/api/tokens", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: oldToken,
            }),
        });
        localStorage.removeItem("fcm-token");

        await signOut();
    };
    return (
        <nav className="flex flex-col items-center w-20 h-screen py-8 space-y-6 bg-white border-r border-gray-200 shadow-sm">
            {/* User Profile */}
            <SignedIn>
                <UserButton
                    appearance={{
                        elements: {
                            userButtonPopoverActionButton__signOut: "hidden",
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
        <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-300 relative group">
            <Icon size={25} />
            <span className="absolute left-full ml-4 px-2 py-0 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                {label}
            </span>
        </button>
    </Link>
);

export default VerticalNavbar;
