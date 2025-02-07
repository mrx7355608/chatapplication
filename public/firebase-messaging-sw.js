// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyClIGp770K73wGVDq5cA-5gzAMDj-9V-qw",
    authDomain: "chatapplication-4933a.firebaseapp.com",
    projectId: "chatapplication-4933a",
    storageBucket: "chatapplication-4933a.firebasestorage.app",
    messagingSenderId: "43166146240",
    appId: "1:43166146240:web:91d4c845c095bfa592d725",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onMessage((payload) => {
    console.log("Message received. ", payload);
    // ...
});
