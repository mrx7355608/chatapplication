"use client";

import { useState, useCallback, createContext } from "react";
import Toast from "@/components/toast";
import { IToast, IToastContext, ToastType } from "@/types/toast-types";

/* Toast Context */
export const ToastContext = createContext<IToastContext | undefined>(undefined);

/* Toast Context Provider */
const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [toasts, setToasts] = useState<IToast[]>([]);

    const addToast = useCallback((type: ToastType, message: string) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => removeToast(id), 5000);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="toast toast-end">
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
