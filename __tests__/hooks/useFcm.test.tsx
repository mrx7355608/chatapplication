import { renderHook } from "@testing-library/react";
import useFcmToken from "@/hooks/useFcmToken";
import { onMessage } from "firebase/messaging";
import { createFCMApp } from "@/lib/firebase";
import useFcm from "@/hooks/useFcm";

jest.mock("@/hooks/useFcmToken");
jest.mock("@/hooks/useToast", () => ({
    useToast: () => ({ addToast: jest.fn() }),
}));
jest.mock("@/lib/firebase");
jest.mock("firebase/messaging", () => ({
    onMessage: jest.fn(),
}));

describe("Testing useFcm() hook", () => {
    beforeAll(() => {
        jest.resetAllMocks();
    });

    it("should not do anything if token is undefined", () => {
        (useFcmToken as jest.Mock).mockReturnValue({ fmcToken: undefined });

        renderHook(() => useFcm());

        expect(createFCMApp).not.toHaveBeenCalled();
        expect(onMessage).not.toHaveBeenCalled();
    });

    it("should register a notification handler", async () => {
        (useFcmToken as jest.Mock).mockReturnValue({ fcmToken: "hello there" });

        renderHook(() => useFcm());

        expect(createFCMApp).toHaveBeenCalled();
        expect(onMessage).toHaveBeenCalled();
    });
});
