import React, { createContext, useContext, useState } from 'react';

const defaultIncomes = [
  3000,1000,500
];

const defaultExpenses = [
  1000, 300,200
];

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [incomes, setIncomes] = useState(defaultIncomes);
  const [expenses, setExpenses] = useState(defaultExpenses);

  const totalIncome = incomes.reduce((total, income) => total + income, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense, 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <Context.Provider value={{ incomes, setIncomes, expenses, setExpenses, totalIncome, totalExpenses, totalBalance }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () =>{
  return useContext(Context)
}