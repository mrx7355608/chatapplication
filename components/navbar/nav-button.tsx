"use client";

import Link from "next/link";
import React from "react";

const NavButton = ({
    icon: Icon,
    label,
    url,
    showForMobile,
}: {
    icon: React.ElementType;
    label: string;
    url: string;
    showForMobile?: boolean;
}) => (
    <>
        {showForMobile ? (
            <Link
                href={url}
                className="flex items-center gap-2 hover:bg-base-100 rounded-md p-2"
            >
                <button className="btn btn-square btn-sm btn-ghost ">
                    <Icon size={20} />
                </button>
                <p className="font-medium">{label}</p>
            </Link>
        ) : (
            <div className="tooltip tooltip-right" data-tip={label}>
                <Link href={url} className="flex items-center gap-2">
                    <button className="btn btn-square btn-ghost">
                        <Icon size={25} />
                    </button>
                </Link>
            </div>
        )}
    </>
);

export default NavButton;
