import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/Context';
import { getAllIncome, getAllExpenses } from '../../database/transaction.db';
import PieChart from './PieChart';

function Chart() {
  const { incomes, expenses, totalIncome, totalExpenses, user, date, duration } = useGlobalContext();
  const [labels, setLabels] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth());

  const [previousIncome, setPreviousIncome] = useState(0);
  const [previousExpenses, setPreviousExpenses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const incomeData = await getAllIncome(uid, date, duration);
            const expenseData = await getAllExpenses(uid, date, duration);

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
  }, [selectedMonth, user]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const reverseArray = (ar) => {
        // const ar = [];

        let newAr = ar
            .slice()
            .reverse()
            .map((sth) => sth.amount);

        // console.log("new ar", newAr)
        return newAr;
    };

    const data = {
        labels, // Example labels for months
        datasets: [
            {
                label: "Income",
                data: incomes ? reverseArray(incomes) : [],
                fill: false,
                borderColor: "green",
                backgroundColor: "green",
                color: "white",
                tension: 0.3,
            },
            {
                label: "Expenses",
                data: expenses ? reverseArray(expenses) : [],
                fill: false,
                borderColor: "red",
                backgroundColor: "red",
                color: "white",
                tension: 0.5,
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
