import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, userCollection } from "./config.db";

const login = async () => {
    const user = await loginWithGoogle();

    const userExist = await checkUserExist(user.uid);

    console.log(user);

    if (!userExist) {
        createNewUser(user);
    } else {
        console.log("user logged in");
    }

    return user;
};

const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const user = (await signInWithPopup(auth, provider)).user;
    return user;
};

const checkUserExist = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return true;
    } else {
        return false;
    }
};

const createNewUser = async (user) => {
    const data = {
        uid: user.uid,
        photoURL: user.photoURL,
        email: user.email,
        name: user.displayName,
        categories: [],
        balance: 0,
    };

    await setDoc(doc(db, "users", user.uid), data);
    console.log("new user created");
};

export { login, checkUserExist };
