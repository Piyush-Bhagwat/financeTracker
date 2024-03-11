import React, { createContext, useContext, useEffect, useState } from "react";

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
    const totalBalance = totalIncome - totalExpenses;

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
        setUser
    };

    return (
        <chartContext.Provider value={value}>{children}</chartContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(chartContext);
};
