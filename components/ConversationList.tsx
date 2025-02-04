"use client";
import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

const ConversationsList = () => {
  const [activeTab, setActiveTab] = useState("chats");

  const conversations = [
    {
      id: 1,
      name: "Alice Smith",
      message: "Hey, how are you?",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Bob Johnson",
      message: "Can we meet tomorrow?",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Carol Williams",
      message: "Thanks for your help!",
      time: "Tuesday",
      unread: 1,
    },
    {
      id: 4,
      name: "David Brown",
      message: "See you later!",
      time: "Monday",
      unread: 0,
    },
    {
      id: 5,
      name: "Team Project",
      message: "Eva: I've updated the docs",
      time: "2:15 PM",
      unread: 5,
      isGroup: true,
    },
  ];

  return (
    <div className="w-80 h-screen flex flex-col bg-white border-r">
      {/* Search Bar */}
      <div className="p-2 bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "chats"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("chats")}
        >
          CHATS
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "groups"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("groups")}
        >
          GROUPS
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations
          .filter((chat) =>
            activeTab === "chats" ? !chat.isGroup : chat.isGroup,
          )
          .map((chat) => (
            <div
              key={chat.id}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            >
              <Image
                src={`/placeholder.svg?height=50&width=50&text=${chat.name[0]}`}
                alt={`${chat.name} Avatar`}
                width={50}
                height={50}
                className="rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <h2 className="text-sm font-semibold">{chat.name}</h2>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.message}</p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConversationsList;
