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

export const ContextProvider = ({ children }) => {
    const [active, setActive] = useState();
    const [uid, setUid] = useState(null);
    const [user] = useDocumentData(doc(db, `users/${uid}`)); //it will get realtime changes from balances
    const [date, setDate] = useState(Date.now());
    const [cashBal, setCashBal] = useState(null);
    const [bankBal, setBankBal] = useState(null);
    const curDate = new Date(date);

    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);

    const [categories, setCategories] = useState(null);
    const [transactions, setTransaction] = useState(null);

    const [categoriesSnap] = useCollection(
        collection(db, `users/${user?.uid}/categories`)
    );

    const transactionQuery = getTransactionQuery(
        user?.uid,
        curDate.getMonth(),
        curDate.getFullYear()
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
            curDate.getMonth(),
            curDate.getFullYear()
        );

        setIncomes(incoms?.data);
    };

    const getExpence = async () => {
        const incoms = await getAllExpenses(
            user?.uid,
            curDate.getMonth(),
            curDate.getFullYear()
        );

        setExpenses(incoms?.data);
    };
    const totalBalance = totalIncome - totalExpenses;

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

        // console.log(transactionsSnap);

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
        setUid,
        active,
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
