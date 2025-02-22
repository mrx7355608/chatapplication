"use client";

import type React from "react";
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { IToast } from "@/types/toast-types";

const iconMap = {
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
    info: Info,
};

const Toast: React.FC<IToast & { onClose: () => void }> = ({
    type,
    title,
    message,
    onClose,
}) => {
    const Icon = iconMap[type];

    return (
        <div className={`alert shadow-lg border border-neutral min-w-[400px]`}>
            <Icon className={`h-6 w-6 text-${type}`} />
            <div>
                <h3 className="font-bold">{title}</h3>
                <div className="text-sm">{message}</div>
            </div>
            <button
                onClick={onClose}
                className="btn btn-circle btn-xs"
                aria-label="Close toast"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

export default Toast;
