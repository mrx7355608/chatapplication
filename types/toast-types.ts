export type ToastType = "success" | "warning" | "error" | "info";

export interface IToast {
    id: number;
    type: ToastType;
    message: string;
}

export interface IToastContext {
    addToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: number) => void;
}
