import useNotificationsPermission from "@/utils/hooks/useNotificationPermission";
import { renderHook, waitFor } from "@testing-library/react";

describe("Testing useNotificationPermission() hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it("should return permission from user", async () => {
        jest.spyOn(Notification, "requestPermission").mockResolvedValue(
            "granted"
        );
        const { result } = renderHook(() => useNotificationsPermission());
        await waitFor(async () => await Notification.requestPermission());
        expect(result.current.permission).toBe("granted");
    });
});
