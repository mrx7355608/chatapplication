import type React from "react";
import Image from "next/image";
import { MessageCircle, Users, Settings, LogOut, Clock } from "lucide-react";

const VerticalNavbar = () => {
  return (
    <nav className="flex flex-col items-center w-20 h-screen py-8 space-y-6 bg-white border-r border-gray-200 shadow-sm">
      {/* User Profile */}
      <button className="relative group">
        <Image
          src="/placeholder.svg?height=48&width=48"
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full border-2 border-green-400"
        />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
        <span className="absolute left-full ml-4 px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
          Profile
        </span>
      </button>

      {/* Chats */}
      <NavButton icon={MessageCircle} label="Chats" />

      {/* Groups */}
      <NavButton icon={Users} label="Groups" />

      {/* Pending Requests */}
      <NavButton icon={Clock} label="Pending Requests" />

      {/* Settings */}
      <NavButton icon={Settings} label="Settings" />

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
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-300 relative group">
    <Icon size={25} />
    <span className="absolute left-full ml-4 px-2 py-0 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
      {label}
    </span>
  </button>
);

export default VerticalNavbar;
