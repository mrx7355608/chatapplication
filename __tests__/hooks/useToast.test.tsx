import "@testing-library/react";
import { useToast } from "@/utils/hooks/useToast";
import { renderHook } from "@testing-library/react";
import ToastProvider from "@/utils/context/toast-context";
import { ReactNode } from "react";

jest.mock("lucide-react", () => ({
    AlertCircle: null,
    CheckCircle: null,
    Info: null,
    X: null,
    XCircle: null,
}));

describe("Testing useToast() hook", () => {
    it("should return error when used outside ToastContext", () => {
        expect(() => {
            renderHook(() => useToast());
        }).toThrow("useToast must be used within a ToastProvider");
    });

    it("should return an addTodo() function", () => {
        function Wrapper({ children }: { children: ReactNode }) {
            return <ToastProvider>{children}</ToastProvider>;
        }
        const { result } = renderHook(() => useToast(), {
            wrapper: Wrapper,
        });
        expect(result.current).toEqual({ addToast: expect.any(Function) });
    });
});
