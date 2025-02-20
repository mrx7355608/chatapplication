import React from "react";
import { Palette } from "lucide-react";

export default function Settings() {
    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto px-5">
            <h1 className="text-3xl font-bold mb-8 ml-7 mt-12">Settings</h1>
            <div className="flex gap-3 items-center p-4 border border-x-0 border-b-neutral border-t-0">
                <Palette size={25} />
                <p className="font-medium">Theme</p>
                <ThemeMenu />
            </div>
        </div>
    );
}

const ThemeMenu = () => {
    return (
        <div className="ml-auto dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
            >
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Default"
                        value="sunset"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Dracula"
                        value="dracula"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Cyberpunk"
                        value="cyberpunk"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Business"
                        value="business"
                    />
                </li>
            </ul>
        </div>
    );
};
