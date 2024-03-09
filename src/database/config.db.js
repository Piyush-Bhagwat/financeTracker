import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAmKwH8gR3-Xpodm5948gMS0ozZ-txyI2c",
    authDomain: "finance-tracker-54f13.firebaseapp.com",
    projectId: "finance-tracker-54f13",
    storageBucket: "finance-tracker-54f13.appspot.com",
    messagingSenderId: "568563772621",
    appId: "1:568563772621:web:d560f3d072ae70a9294d84",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const login = async () => {
    const provider = new GoogleAuthProvider();
    const user = (await signInWithPopup(auth, provider)).user;
    return user;
};

export { app, db, auth, login };
