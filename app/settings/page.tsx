import React from "react";
import { Palette } from "lucide-react";
import ThemeSelector from "./components/theme-selector";

export default function Settings() {
    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto px-5">
            <h1 className="text-3xl font-bold mb-8 ml-7 mt-12">Settings</h1>
            <div className="flex gap-3 items-center p-4 border border-x-0 border-b-neutral border-t-0">
                <Palette size={25} />
                <p className="font-medium">Theme</p>
                <ThemeSelector />
            </div>
        </div>
    );
}
