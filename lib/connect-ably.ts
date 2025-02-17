import { Realtime } from "ably";

let ably: Realtime;

export function connectAbly() {
    if (!ably) {
        console.log("Created new ably instance");
        ably = new Realtime({
            authUrl: "api/ably-authenticate",
        });
    }

    return ably;
}
