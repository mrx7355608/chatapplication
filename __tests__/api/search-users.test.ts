import * as appHandler from "../../app/api/search-users/route";
import { testApiHandler } from "next-test-api-route-handler";

describe("TEST /search-users", () => {
    // TODO: add a test for checking authenticated requests

    it("should return error if username is not provided", async () => {
        await testApiHandler({
            url: "/search-users?username=",
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: "GET" });
                expect(res.status).toBe(400);
                await expect(res.json()).resolves.toStrictEqual({
                    error: "Please enter a username to search",
                });
            },
        });
    });
    it("should return error if username is not provided", async () => {
        await testApiHandler({
            url: "/search-users?username=",
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: "GET" });
                expect(res.status).toBe(400);
                await expect(res.json()).resolves.toStrictEqual({
                    error: "Please enter a username to search",
                });
            },
        });
    });

    it("should return 404 not found when a user is not found", async () => {
        await testApiHandler({
            url: "/search-users?username=john",
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: "GET" });
                expect(res.status).toBe(404);
                await expect(res.json()).resolves.toStrictEqual({
                    data: null,
                });
            },
        });
    });

    it("should return user", async () => {
        await testApiHandler({
            url: "/search-users?username=fwdimran",
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: "GET" });
                await expect(res.json()).resolves.toStrictEqual({
                    data: {
                        clerk_id: expect.any(String),
                        conversation_ids: expect.any(Array),
                        fullname: expect.any(String),
                        iam_friends_with_ids: expect.any(Array),
                        id: expect.any(String),
                        image: expect.any(String),
                        my_friends_ids: expect.any(Array),
                        status: expect.any(String),
                        username: "fwdimran",
                    },
                });
            },
        });
    });
});
