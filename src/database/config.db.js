import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAmKwH8gR3-Xpodm5948gMS0ozZ-txyI2c",
    authDomain: "finance-tracker-54f13.firebaseapp.com",
    projectId: "finance-tracker-54f13",
    storageBucket: "finance-tracker-54f13.appspot.com",
    messagingSenderId: "568563772621",
    appId: "1:568563772621:web:d560f3d072ae70a9294d84",
};

const app = initializeApp(firebaseConfig);

export { app };
