export type ToastType = "success" | "warning" | "error" | "info";

export interface IToast {
    id: number;
    type: ToastType;
    title: string;
    message: string;
}

export interface IToastContext {
    addToast: (type: ToastType, title: string, message: string) => void;
}
