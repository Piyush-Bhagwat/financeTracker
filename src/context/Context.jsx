import React, { createContext, useContext, useState } from "react";

const defaultIncomes = [3000, 1000, 500];

const defaultExpenses = [1000, 300, 200];

const chartContext = createContext();

export const ContextProvider = ({ children }) => {
    const [incomes, setIncomes] = useState(defaultIncomes);
    const [expenses, setExpenses] = useState(defaultExpenses);

    const [user, setUser] = useState(null);

    const totalIncome = incomes.reduce((total, income) => total + income, 0);
    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense,
        0
    );
    const totalBalance = totalIncome - totalExpenses;

    return (
        <chartContext.Provider
            value={{
                incomes,
                setIncomes,
                expenses,
                setExpenses,
                totalIncome,
                totalExpenses,
                totalBalance,
            }}
        >
            {children}
        </chartContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(chartContext);
};
