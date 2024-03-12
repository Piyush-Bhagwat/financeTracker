import React , {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/Context';
import { getAllIncome, getAllExpenses } from '../../database/transaction.db';

function Chart() {
  const { incomes, uid, expenses, user } = useGlobalContext();
  const [labels, setLabels] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const currentMonth = (new Date()).getMonth() + 1; 
      const currentYear = (new Date()).getFullYear();
      
      const incomeData = await getAllIncome(uid, currentMonth, currentYear);
      const expenseData = await getAllExpenses(uid, currentMonth, currentYear);

      const allData = [...incomeData.data, ...expenseData.data];
      const uniqueMonths = [...new Set(allData.map(item => item.date.getMonth()))];
      
      const monthNames = uniqueMonths.map(month => {
        return new Date(0, month).toLocaleString('en-US', { month: 'long' });
      });
      
      setLabels(monthNames);
    };

    fetchData();
  }, []);

  const data = {
    labels: ['January', 'February', 'March'], // Example labels for months
    datasets: [
      {
        label: 'Income',
        data:incomes ? incomes.map(income => income.amount) : [], 
        fill: false,
        borderColor: 'green',
        backgroundColor:'green',
        color:'white',
        tension: 0.2, 
      },
      {
        label: 'Expenses',
        data:expenses ? expenses.map(expense => expense.amount) : [],
        fill: false,
        borderColor: 'red',
        backgroundColor:'red',
        color:'white',
        tension: 0.2, 
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
          color: 'rgba(240, 240, 240, 0.5)', // Lightish white color for x-axis grid lines
        },
        ticks: {
          color: 'rgba(240, 240, 240, 0.8)', // Lightish white color for x-axis labels
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Change the color of the y-axis grid lines to white
        },
        ticks: {
          color:'rgba(240, 240, 240, 0.5)' // Make x-axis labels bold
        },
      },
    },
  };
  return (
    <div className='container'>
      <Line data={data} options={options} />
    </div>
  );

}

export default Chart;
