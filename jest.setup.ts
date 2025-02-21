import "@testing-library/jest-dom";
globalThis.Notification = {
    requestPermission: jest.fn(),
    permission: "granted",
} as unknown as jest.Mocked<typeof Notification>;

globalThis.fetch = jest.fn();
