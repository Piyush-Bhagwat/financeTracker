import React, {
    createContext,
    useContext,
    useEffect,
    useId,
    useState,
} from "react";
import { login } from "../database/auth.db";
import { getCategories } from "../database/user.db";
import {
    useCollectionData,
    useDocumentData,
    useCollection,
} from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "../database/config.db";
import {
    getAllExpenses,
    getAllIncome,
    getTransactionQuery,
} from "../database/transaction.db";

const chartContext = createContext();
let uid;
export const ContextProvider = ({ children }) => {
    const [active, setActive] = useState(1);
    const [uid, setUid] = useState(null);
    const [user] = useDocumentData(doc(db, `users/${uid}`)); //it will get realtime changes from balances
    const [date, setDate] = useState(new Date());
    const [cashBal, setCashBal] = useState(null);
    const [bankBal, setBankBal] = useState(null);

    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);

    const [categories, setCategories] = useState(null);
    const [transactions, setTransaction] = useState(null);

    const [categoriesSnap] = useCollection(
        collection(db, `users/${user?.uid}/categories`)
    );

    const transactionQuery = getTransactionQuery(
        user?.uid,
        date.getMonth(),
        date.getFullYear()
    );

    const [transactionsSnap] = useCollection(transactionQuery);

    const totalIncome = incomes?.reduce(
        (total, income) => total + parseFloat(income.amount),
        0
    );
    const totalExpenses = expenses?.reduce(
        (total, expense) => total + parseFloat(expense.amount),
        0
    );

    // -------------Functions--------------------
    const handleLogin = async () => {
        const userID = await login();
        setUid(userID);

        localStorage.setItem("user", JSON.stringify(userID));
    };

    const checkLoginData = () => {
        let userID = localStorage.getItem("user");
        userID = JSON.parse(userID);

        if (userID) {
            setUid(userID);
        }
    };

    const getIncome = async () => {
        const incoms = await getAllIncome(
            user?.uid,
            date.getMonth(),
            date.getFullYear()
        );

        setIncomes(incoms?.data);
    };

    const getExpence = async () => {
        const incoms = await getAllExpenses(
            user?.uid,
            date.getMonth(),
            date.getFullYear()
        );

        setExpenses(incoms?.data);
    };
    const totalBalance = cashBal + bankBal;

    function getStartAndEndDate(date, duration) {
        let startDate, endDate;
        const [year, month, day] = date.split("-").map(Number); // Assuming date is in format d/m/y

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

        return [startDate.getTime(), endDate.getTime()];
    }

    //---------------------on Page Load-----------------------
    useEffect(() => {
        checkLoginData();
    }, []);

    useEffect(() => {
        //get categories
        const newCat = categoriesSnap?.docs?.map((cat) => {
            return { id: cat.id, ...cat.data() };
        });

        setCategories(newCat);
    }, [categoriesSnap]);

    useEffect(() => {
        //get categories
        const newTrans = transactionsSnap?.docs?.map((cat) => {
            return { id: cat.id, ...cat.data() };
        });

        setTransaction(newTrans);
    }, [transactionsSnap]);

    useEffect(() => {
        setCashBal(user?.cashBal);
        setBankBal(user?.bankBal);
    }, [user]);

    // -----------------All print statements------------------

    useEffect(() => {
        if (user) console.log("user Update", user);
        getIncome();
        getExpence();
    }, [user]);

    useEffect(() => {
        if (categories) console.log("Categories Update", categories);
    }, [categories]);

    useEffect(() => {
        if (transactions) console.log("Transactions Update", transactions);
    }, [transactions]);

    useEffect(() => {
        setDate(new Date());
    }, [active]);

    const value = {
        incomes,
        setIncomes,
        expenses,
        setExpenses,
        totalIncome,
        totalExpenses,
        totalBalance,
        user,
        bankBal,
        cashBal,
        uid,
        categories,
        transactions,
        getStartAndEndDate,
        setUid,
        active,
        date,
        setDate,
        setBankBal,
        setCashBal,
        setActive,
        handleLogin,
    };

    return (
        <chartContext.Provider value={value}>{children}</chartContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(chartContext);
};

export { uid };
