"use client";

import { useState, useCallback, createContext } from "react";
import Toast from "@/components/toast";
import { IToast, IToastContext, ToastType } from "@/utils/types/toast-types";

/* Toast Context */
export const ToastContext = createContext<IToastContext | undefined>(undefined);

/* Toast Context Provider */
const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [toasts, setToasts] = useState<IToast[]>([]);

    const addToast = useCallback(
        (type: ToastType, title: string, message: string) => {
            const id = Date.now();
            setToasts((prev) => [...prev, { id, type, title, message }]);
            setTimeout(() => removeToast(id), 8000);
        },
        []
    );

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast toast-start">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastProvider;
