import useNotificationsPermission from "@/utils/hooks/useNotificationPermission";
import { renderHook, waitFor } from "@testing-library/react";

describe("Testing useNotificationPermission() hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should return permission from user", async () => {
        const { result } = renderHook(() => useNotificationsPermission());
        expect(result.current.permission).toBe("aa");
    });
});
