"use client";
import React from "react";
import { Palette } from "lucide-react";

export default function ThemeSelector() {
    const DEFAULT_THEME = "sunset";

    const setCookie = (theme: string) => {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 100);
        document.cookie = `current-theme=${encodeURIComponent(
            theme
        )}; expires=${expires.toUTCString()}; path=/`;
    };

    const changeTheme = (theme: string) => {
        const themes = ["sunset", "business", "dracula", "cyberpunk"];
        if (!themes.includes(theme)) {
            theme = DEFAULT_THEME;
        }

        document.documentElement.setAttribute("data-theme", theme);
        setCookie(theme);
    };

    return (
        <div className="dropdown dropdown-right">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-square"
            >
                <Palette size={25} />
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
                        onClick={() => changeTheme("sunset")}
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Dracula"
                        value="dracula"
                        onClick={() => changeTheme("dracula")}
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Cyberpunk"
                        value="cyberpunk"
                        onClick={() => changeTheme("cyberpunk")}
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Business"
                        value="business"
                        onClick={() => changeTheme("business")}
                    />
                </li>
            </ul>
        </div>
    );
}
