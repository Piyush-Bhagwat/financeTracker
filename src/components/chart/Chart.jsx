import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/Context';
import { getAllIncome, getAllExpenses } from '../../database/transaction.db';
import PieChart from './PieChart';

function Chart() {
  const { totalIncome, totalExpenses, user } = useGlobalContext();
  const [labels, setLabels] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth());

  const [date, setDate] = useState(Date.now());
  const curDate = new Date(date);

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [previousIncome, setPreviousIncome] = useState(0);
  const [previousExpenses, setPreviousExpenses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const currentMonth = selectedMonth + 1; 
      const currentYear = curDate.getFullYear();
      
      const incomeData = await getAllIncome(user?.uid, currentMonth, currentYear);
      console.log("Income data:", incomeData);
      setIncomes(incomeData?.data);

      const expenseData = await getAllExpenses(user?.uid, currentMonth, currentYear);
      console.log("Expense data:", expenseData);
      setExpenses(expenseData?.data);

      const previousMonth = (currentMonth - 1 === 0) ? 12 : currentMonth - 1;
      const previousYear = (currentMonth - 1 === 0) ? currentYear - 1 : currentYear;

      const previousIncomeData = await getAllIncome(user?.uid, previousMonth, previousYear);
      const previousExpenseData = await getAllExpenses(user?.uid, previousMonth, previousYear);

      const previousIncomeAmount = previousIncomeData?.data.reduce((acc, curr) => acc + curr.amount, 0) || 0;
      const previousExpensesAmount = previousExpenseData?.data.reduce((acc, curr) => acc + curr.amount, 0) || 0;
      setPreviousIncome(previousIncomeAmount);
      setPreviousExpenses(previousExpensesAmount);

      const lastMonth = (currentMonth - 1 === 0) ? 12 : currentMonth - 1;
      const nextMonth = (currentMonth + 1 === 13) ? 1 : currentMonth + 1;

      const lastMonthName = new Date(0, lastMonth - 1).toLocaleString('en-US', { month: 'long' });
      const currentMonthName = new Date(0, currentMonth - 1).toLocaleString('en-US', { month: 'long' });
      const nextMonthName = new Date(0, nextMonth - 1).toLocaleString('en-US', { month: 'long' });

      setLabels([lastMonthName, currentMonthName, nextMonthName]);
    };

    fetchData();
  }, [selectedMonth, user?.uid]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };


  
  const data = {
    labels: labels, 
    datasets: [
      {
        label: 'Income',
        data: [previousIncome,0,totalIncome],
        fill: true,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        color: 'white',
        tension: 0.4, 
      },
      {
        label: 'Expenses',
        data: [previousExpenses, 0,totalExpenses],
        fill: true,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        color: 'white',
        tension: 0.4, 
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', 
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(240, 240, 240, 0.5)',
        },
        ticks: {
          color: 'rgba(240, 240, 240, 0.8)',
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: 'rgba(240, 240, 240, 0.5)',
          max: Math.max(totalIncome, totalExpenses),
        },
      },
    },
  };

  return (
    <div className='container'>
      {/* <select value={selectedMonth} onChange={handleMonthChange}>
        <option value={0}>January</option>
        <option value={1}>February</option>
        <option value={2}>March</option>
        <option value={3}>April</option>
       
      </select> */}
      <Line data={data} options={options} />
    </div>
  );
}

export default Chart;
