import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
} from "@firebase/firestore";
import { db } from "./config.db";
import { addBalance } from "./user.db";

const addTransaction = async (uid, transactionData) => {
    const colRef = collection(db, `users/${uid}/transactions`);

    await addDoc(colRef, transactionData);

    if (transactionData.type == "income") {
        addBalance(uid, transactionData.amount, transactionData.mode);
    } else {
        addBalance(uid, -transactionData.amount, transactionData.mode);
    }
    console.log("transactionData inserted");
};

const getTransactions = async (query) => {
    // const colRef = collection(db, `users/${uid}/transactions`);
    const transactionsSnapShot = await getDocs(query);

    const transactions = [];

    transactionsSnapShot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
    });

    return transactions;
};

const getTransactionQuery = (uid, date, duration) => {
    const [startTimestamp, endTimestamp] = getStartAndEndDate(date, duration);

    const transactionsRef = collection(db, `users/${uid}/transactions`);
    const q = query(
        transactionsRef,
        where("time", ">=", startTimestamp),
        where("time", "<=", endTimestamp),
        orderBy("time", "desc")
    );

    return q;
};

function getStartAndEndDate(date, duration) {
    let startDate, endDate;
    const year = new Date(date).getFullYear(); 
    const month = new Date(date).getMonth() + 1;
    const day =  new Date(date).getDate();


    if (duration === "daily") {
        startDate = new Date(year, month - 1, day); // Months are 0-indexed in JavaScript
        endDate = new Date(year, month - 1, day, 23, 59, 59, 999); // End of the day
    } else if (duration === "weekly") {
        const selectedDate = new Date(year, month - 1, day);
        const dayOfWeek = selectedDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        const diff =
            selectedDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Start of the week
        startDate = new Date(selectedDate.setDate(diff));
        endDate = new Date(selectedDate.setDate(diff + 6)); // End of the week
        endDate.setHours(23, 59, 59, 999); // End of the day
    } else if (duration === "monthly") {
        startDate = new Date(year, month - 1, 1); // First day of the month
        endDate = new Date(year, month, 0); // Last day of the month
        endDate.setHours(23, 59, 59, 999); // End of the day
    }

    return [startDate?.getTime(), endDate?.getTime()];
}

const getAllExpenses = async (uid, date, duration) => {
    const q = getTransactionQuery(uid, date, duration);
    const docSnapshot = (await getDocs(q)).docs;

    let expense = 0;
    const data = [];
    docSnapshot?.forEach((doc) => {
        if (doc.data().type === "expense") {
            data.push({ id: doc.id, ...doc.data() });
            expense += parseFloat(doc.data().amount);
        }
    });

    return { total: expense, data };
};

const getAllIncome = async (uid, date, duration) => {
    const q = getTransactionQuery(uid, date, duration);
    const docSnapshot = (await getDocs(q)).docs;

    let income = 0;
    const data = [];

    docSnapshot?.forEach((doc) => {
        if (doc.data().type === "income") {
            data.push({ id: doc.id, ...doc.data() });
            income += parseFloat(doc.data().amount);
        }
    });

    return { total: income, data };
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
