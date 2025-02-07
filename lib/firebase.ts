import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyClIGp770K73wGVDq5cA-5gzAMDj-9V-qw",
    authDomain: "chatapplication-4933a.firebaseapp.com",
    projectId: "chatapplication-4933a",
    storageBucket: "chatapplication-4933a.firebasestorage.app",
    messagingSenderId: "43166146240",
    appId: "1:43166146240:web:91d4c845c095bfa592d725",
};

const firebase = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebase);
