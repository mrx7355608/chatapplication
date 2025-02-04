import type React from "react";
import { MessageCircle, Settings, LogOut, Clock, UserPlus } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const VerticalNavbar = () => {
  return (
    <nav className="flex flex-col items-center w-20 h-screen py-8 space-y-6 bg-white border-r border-gray-200 shadow-sm">
      {/* User Profile */}
      <SignedIn>
        <UserButton />
      </SignedIn>

      {/* Chats */}
      <NavButton icon={MessageCircle} label="Chats" url="/" />

      {/* Add friends */}
      <NavButton icon={UserPlus} label="Add Users" url="/add-users" />

      {/* Pending Requests */}
      <NavButton
        icon={Clock}
        label="Pending Requests"
        url="/pending-requests"
      />

      {/* Settings */}
      <NavButton icon={Settings} label="Settings" url="/settings" />

      {/* Logout */}
      <button className="mt-auto p-3 text-red-600 hover:text-white hover:bg-red-600 rounded-full transition-colors duration-300 relative group">
        <LogOut size={28} />
        <span className="absolute left-full ml-4 px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
          Logout
        </span>
      </button>
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
