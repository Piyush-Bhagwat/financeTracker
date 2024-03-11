import { addDoc, collection, getDocs, query, where, orderBy } from "@firebase/firestore";
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

const getTransactionQuery = (uid, month, year) => {
    const startTimestamp = new Date(year, month, 1);
    startTimestamp.setHours(0, 0, 0, 0);

    const endTimestamp = new Date(year, month + 1, 0); // Get last day of previous month
    endTimestamp.setHours(23, 59, 59, 999);

    const transactionsRef = collection(db, `users/${uid}/transactions`);
    const q = query(
        transactionsRef,
        where("time", ">=", startTimestamp.getTime()),
        where("time", "<=", endTimestamp.getTime()),
        orderBy("time", "desc")
    );

    return q;
};

const getAllExpenses = async (uid, month, year) => {
    const q = getTransactionQuery(uid, month, year);
    const docSnapshot = (await getDocs(q)).docs;

    let expense = 0;

    docSnapshot?.forEach((doc) => {
        if (doc.data().type === "expense") {
            expense += parseFloat(doc.data().amount);
        }
    });

    return expense;
};

const getAllIncome = async (uid, month, year) => {
    const q = getTransactionQuery(uid, month, year);
    const docSnapshot = (await getDocs(q)).docs;

    let income = 0;

    docSnapshot?.forEach((doc) => {
        if (doc.data().type === "income") {
            income += parseFloat(doc.data().amount);
        }
    });

    return income;
};

const fuckIt = () => {
    alert("fuck it boi hehe");
};

export {
    addTransaction,
    getTransactions,
    getAllExpenses,
    getAllIncome,
    getTransactionQuery,
    fuckIt,
};
