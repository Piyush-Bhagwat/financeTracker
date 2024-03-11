import {
    collection,
    doc,
    updateDoc,
    getDocs,
    addDoc,
} from "@firebase/firestore";
import { db } from "./config.db";

const setBalance = async (uid, balanceAmount) => {
    const colRef = doc(db, "users", uid);

    await updateDoc(colRef, { balance: balanceAmount });
    console.log("balance updated");
};

const getCategories = async (uid) => {
    const colRef = collection(db, `users/${uid}/categories`);

    const snapShot = await getDocs(colRef);
    const categories = [];

    snapShot.forEach((cat) => {
        categories.push({ id: cat.id, ...cat.data() });
    });

    console.log(categories);
};

const addCategory = async (uid, categoryData) => {
    const colRef = collection(db, `users/${uid}/categories`);

    await addDoc(colRef, categoryData);
    console.log("added a category");
};



export { setBalance, getCategories, addCategory};
