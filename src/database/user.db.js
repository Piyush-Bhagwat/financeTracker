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

const getAllIncomes=async(uid)=>{
    const colRef = collection(db, `users/${uid}/incomes`);
    const snapShot = await getDocs(colRef);
    const incomes = [];
     
    snapShot.forEach((cat) => {
        incomes.push({ id: cat.id, ...cat.data() });
    });

    console.log(incomes);
}

const getAllExpenses=async(uid)=>{
    const colRef = collection(db, `users/${uid}/expenses`);
    const snapShot = await getDocs(colRef);
    const expenses = [];
    
    snapShot.forEach((cat) => {
        expenses.push({ id: cat.id, ...cat.data() });
    });

    console.log(expenses);
}

export { setBalance, getCategories, addCategory, getAllIncomes, getAllExpenses };
