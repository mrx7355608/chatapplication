// Give the service worker access to Firebase Messaging.
// NOTE: You can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
    "https://www.gstatic.com/firebasejs/11.3.1/firebase-app-compat.js",
);
importScripts(
    "https://www.gstatic.com/firebasejs/11.3.1/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker
try {
    fetch("/api/firebase-data", { credentials: "include" })
        .then((resp) => resp.json())
        .then((config) => {
            const app = firebase.initializeApp(config);
            const messaging = firebase.messaging(app);
            console.log("Firebase initialized");

            messaging.onBackgroundMessage((payload) => {
                console.log("Received background message: ", payload);
                const data = payload.data;

                self.registration.showNotification(data.title, {
                    body: data.body,
                    icon: data.image,
                    data: {
                        url: data.url,
                    },
                });
            });
        })
        .catch(console.log);
} catch (err) {
    console.log(err);
}

self.addEventListener("notificationclick", (e) => {
    e.waitUntil(clients.openWindow(e.notification.data.url)); // and here
});
