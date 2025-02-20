"use client";

import { SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { Spinner } from "./spinner";
import { LogOut } from "lucide-react";
import { dark } from "@clerk/themes";

export default function CustomClerkMenu() {
    const { signOut } = useAuth();
    const [loading, setLoading] = useState(false);

    const customLogout = async () => {
        try {
            setLoading(true);
            const oldToken = localStorage.getItem("fcm-token");
            if (!oldToken) {
                await signOut();
                return;
            }

            /* Remove token from database */
            await fetch("/api/remove-tokens", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: oldToken,
                }),
            });

            /* Remove token from local storage */
            localStorage.removeItem("fcm-token");

            /* Execute clerk's signOut() */
            await signOut();
        } catch (err) {
            console.log("Error:", (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SignedIn>
            {loading ? (
                <Spinner size="md" />
            ) : (
                <UserButton
                    appearance={{
                        elements: {
                            userButtonPopoverActionButton__signOut: "hidden",
                        },
                        baseTheme: dark,
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
            )}
        </SignedIn>
    );
}
