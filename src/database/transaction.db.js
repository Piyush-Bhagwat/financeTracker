import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "./config.db";

const addTransaction = async (uid, transactionData) => {
    const colRef = collection(db, `users/${uid}/transactions`);

    await addDoc(colRef, transactionData);
    console.log("transactionData inserted");
};

const getTransactions = async (uid) => {
    const colRef = collection(db, `users/${uid}/transactions`);
    const transactionsSnapShot = await getDocs(colRef);

    const transactions = [];

    transactionsSnapShot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
    });

    console.log(transactions);
    return transactions;
};

const getAllExpenses = async (uid, month, year) => {
    const startTimestamp = new Date(year, month, 1);
    startTimestamp.setHours(0, 0, 0, 0);

    console.log(startTimestamp.getTime());
    const endTimestamp = new Date(year, month + 1, 0); // Get last day of previous month
    endTimestamp.setHours(23, 59, 59, 999);

    const transactionsRef = collection(db, `users/${uid}/transactions`);
    const q = query(
        transactionsRef,
        where("time", ">=", startTimestamp.getTime()),
        where("time", "<=", endTimestamp.getTime())
    );

    const docs = (await getDocs(q)).docs;

    console.log(docs);
};

const getAllIncome = async () => {};

const fuckIt = () => {
    alert("fuck it boi hehe");
};

export { addTransaction, getTransactions, getAllExpenses, fuckIt };
