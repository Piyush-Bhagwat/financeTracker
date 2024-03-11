import React, { createContext, useContext, useEffect, useState } from "react";
import { login } from "../database/auth.db";
import { getCategories } from "../database/user.db";
import {
    useCollectionData,
    useCollection,
} from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../database/config.db";

const defaultIncomes = [3000, 1000, 500];

const defaultExpenses = [1000, 300, 200];

const chartContext = createContext();

export const ContextProvider = ({ children }) => {
    const [active, setActive] = useState();

    const [incomes, setIncomes] = useState(defaultIncomes);
    const [expenses, setExpenses] = useState(defaultExpenses);

    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState(null);

    const [transactions, setTransaction] = useState(null);

    const [categoriesSnap] = useCollection(
        collection(db, `users/${user?.uid}/categories`)
    );

    const transactionQuery = query(
        collection(db, `users/${user?.uid}/transactions`),
        orderBy("time", "desc")
    );
    const [transactionsSnap] = useCollection(transactionQuery);

    const totalIncome = incomes.reduce((total, income) => total + income, 0);
    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense,
        0
    );

    // -------------Functions--------------------
    const handleLogin = async () => {
        const userData = await login();
        setUser(userData);

        localStorage.setItem("user", JSON.stringify(userData));
    };

    const checkLoginData = () => {
        let userData = localStorage.getItem("user");
        userData = JSON.parse(userData);

        if (userData) {
            setUser(userData);
        }
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

    // -----------------All print statements------------------

    useEffect(() => {
        if (user) console.log("user Update", user);
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
        categories,
        transactions,
        setUser,
        active,
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
