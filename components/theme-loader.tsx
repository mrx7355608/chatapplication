"use client";

import React, { useEffect } from "react";

export default function ThemeLoader() {
    const DEFAULT_THEME = "sunset";

    useEffect(() => {
        const themes = ["sunset", "business", "dracula", "cyberpunk"];
        let theme = localStorage.getItem("current-theme");

        if (!theme || !themes.includes(theme)) {
            theme = DEFAULT_THEME;
        }

        document.documentElement.setAttribute("data-theme", theme);
    }, []);

    return <></>;
}
