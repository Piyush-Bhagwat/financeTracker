import {
    collection,
    doc,
    updateDoc,
    getDocs,
    addDoc,
} from "@firebase/firestore";
import { db } from "./config.db";

const setBalance = async (uid, balanceAmount, mode) => {
    const colRef = doc(db, "users", uid);

    const toUpdate =
        mode === "cash"
            ? { cashBal: balanceAmount }
            : { bankBal: balanceAmount };

    await updateDoc(colRef, toUpdate);
    console.log("balance updated", toUpdate);
};

const getCategories = async (uid) => {
    const colRef = collection(db, `users/${uid}/categories`);

    const snapShot = await getDocs(colRef);
    const categories = [];

    snapShot.forEach((cat) => {
        categories.push({ id: cat.id, ...cat.data() });
    });

    console.log('fewfefefe',categories);
    return categories; 
};

const addCategory = async (uid, categoryData) => {
    const colRef = collection(db, `users/${uid}/categories`);

    await addDoc(colRef, categoryData);
    console.log("added a category");
};



export { setBalance, getCategories, addCategory};
