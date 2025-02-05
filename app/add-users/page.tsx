"use client";

import Image from "next/image";
import { useState } from "react";

const users = [
  { id: 1, name: "Alice Johnson", username: "@alice" },
  { id: 2, name: "Bob Smith", username: "@bobsmith" },
  { id: 3, name: "Charlie Brown", username: "@charlieb" },
  { id: 4, name: "Diana Prince", username: "@wonderwoman" },
  { id: 5, name: "Ethan Hunt", username: "@mission_possible" },
];

export default function SearchFriends() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <h1 className="text-center text-3xl p-4 font-bold mb-4">
        Search Friends
      </h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by name or username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full input input-bordered rounded-xl mb-4"
        />
        <button className="btn btn-neutral text-white rounded-xl">
          Search
        </button>
      </div>
      <ul className="space-y-2 w-full">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-3 border p-3 px-4 rounded"
          >
            <div className="rounded-full object-fit bg-gray-100 w-[60px] h-[60px]"></div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.username}</p>
            </div>
            <button className="btn btn-outline btn-sm btn-ghost rounded-full ml-auto">
              Add friend
            </button>
          </li>
        ))}
      </ul>
      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users found</p>
      )}
    </div>
  );
}
