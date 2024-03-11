import React, { createContext, useContext, useEffect, useState } from "react";
import { login } from "../database/auth.db";

const defaultIncomes = [3000, 1000, 500];

const defaultExpenses = [1000, 300, 200];

const chartContext = createContext();

export const ContextProvider = ({ children }) => {
    const [incomes, setIncomes] = useState(defaultIncomes);
    const [expenses, setExpenses] = useState(defaultExpenses);

    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState(null);

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

    //-------------on Page Load-----------------
    useEffect(() => {
        checkLoginData();
    }, []);

    // -----------------All print statements------------------

    useEffect(() => {
        console.log("user Update", user);
    }, [user]);

    const value = {
        incomes,
        setIncomes,
        expenses,
        setExpenses,
        totalIncome,
        totalExpenses,
        totalBalance,
        user,
        setUser,
        handleLogin,
    };

    return (
        <chartContext.Provider value={value}>{children}</chartContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(chartContext);
};
