import { addDoc, collection, getDocs } from "@firebase/firestore";
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
    return transactions
};

const fuckIt = () => {
    alert("fuck it boi hehe");
};

export { addTransaction, getTransactions, fuckIt };
