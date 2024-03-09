import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth, userCollection } from "./config.db";

const login = async () => {
    const user = await loginWithGoogle();
};

const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const user = (await signInWithPopup(auth, provider)).user;
    return user;
};

const checkUserExist = async () => {
    
}


export {login}
