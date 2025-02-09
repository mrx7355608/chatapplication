// Give the service worker access to Firebase Messaging.
// NOTE: You can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker
try {
    fetch("/api/firebase-data", { credentials: "include" })
        .then((resp) => resp.json())
        .then((config) => {
            firebase.initializeApp(config);
            const messaging = firebase.messaging();
            console.log("Firebase initialized");

            // WARNING: Do not remove the below function otherwise you won't receive notifications
            messaging.onBackgroundMessage((payload) => {
                console.log({ payload });
            });
        })
        .catch(console.log);
} catch (err) {
    console.log(err);
}
