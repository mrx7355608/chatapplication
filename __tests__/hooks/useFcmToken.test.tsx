import useFcmToken from "@/hooks/useFcmToken";
import { renderHook, waitFor } from "@testing-library/react";
import useNotificationsPermission from "@/hooks/useNotificationPermission";
import { getToken } from "firebase/messaging";
import { createFCMApp } from "@/lib/firebase";

jest.mock("@/lib/firebase", () => ({
    createFCMApp: jest.fn(),
}));
jest.mock("@/hooks/useNotificationPermission");
jest.mock("firebase/messaging", () => ({
    getToken: jest.fn(),
}));
const mockToken = "hello there";

describe("Testing useFcmToken() hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        localStorage.clear();
    });

    it("should not fetch token if permission is denied", () => {
        (useNotificationsPermission as jest.Mock).mockResolvedValue({
            permission: "denied",
        });

        renderHook(() => useFcmToken());

        expect(createFCMApp).not.toHaveBeenCalled();
        expect(getToken).not.toHaveBeenCalled();
    });

    it("should not fetch token if it is already saved in local storage", () => {
        localStorage.setItem("fcm-token", mockToken);
        (useNotificationsPermission as jest.Mock).mockReturnValue({
            permission: "granted",
        });
        (createFCMApp as jest.Mock).mockResolvedValue({});

        const { result } = renderHook(() => useFcmToken());

        expect(createFCMApp).toHaveBeenCalled();
        expect(localStorage.getItem("fcm-token")).toBe(mockToken);
        expect(getToken).not.toHaveBeenCalled();
        expect(result.current.fcmToken).toBe(mockToken);
    });

    it("should fetch token and save it in localStorage and make an api call to save it in db", async () => {
        (useNotificationsPermission as jest.Mock).mockReturnValue({
            permission: "granted",
        });
        (createFCMApp as jest.Mock).mockResolvedValue({});
        (getToken as jest.Mock).mockResolvedValue(mockToken);
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ success: true }),
        });

        const { result } = renderHook(() => useFcmToken());

        // Waits for async operations to end like fetch(), getToken() etc
        await waitFor(() => {});

        expect(getToken).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith("/api/save-tokens", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ token: mockToken }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        expect(localStorage.getItem("fcm-token")).toBe(mockToken);

        // Waits for setFcmToken() state update to finish
        await waitFor(() => {});

        expect(result.current.fcmToken).toBe(mockToken);
    });
});
