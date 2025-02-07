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
    message,
    onClose,
}) => {
    const Icon = iconMap[type];

    return (
        <div className={`alert alert-${type} shadow-lg border border-gray-200`}>
            <Icon className="h-6 w-6" />
            <span>{message}</span>
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
