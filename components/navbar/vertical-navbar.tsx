"use client";

import { MessageCircle, Clock, UserPlus } from "lucide-react";
import NavButton from "./nav-button";
import CustomClerkMenu from "./custom-clerk-menu";
import ThemeSelector from "../theme-selector";

const VerticalNavbar = () => {
    return (
        <nav className="hidden lg:flex relative flex-col items-center w-20 h-screen py-8 space-y-6 border-r border-neutral bg-base-200">
            {/* User Profile */}
            <CustomClerkMenu />

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

            {/* Theme selector */}
            <ThemeSelector />
        </nav>
    );
};

export default VerticalNavbar;
