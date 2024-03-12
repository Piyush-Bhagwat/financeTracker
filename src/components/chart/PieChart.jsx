import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/Context';
import { getCategories } from '../../database/user.db';
import { getTransactions } from '../../database/transaction.db';
import '../../assets/style/piechart.css'
function PieChart() {
  const { user } = useGlobalContext();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories(user?.uid);
        const transactions = await getTransactions(user?.uid);
        
        const categoryNames = categories.map(category => category.name);
        if (categories && transactions) {
        const transactionAmounts = transactions.map(transaction => parseFloat(transaction.amount));
  
        const pieChartData = categoryNames.map((name, index) => ({
          name,
          amount: transactionAmounts[index] || 0, 
        }));
  
          setCategoryData(pieChartData);
          // console.log("Category data:", pieChartData);
        } else {
          console.log("No categories :", user?.uid);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    if (user?.uid) {
      fetchData();
    } else {
      console.log("User ID is not available.");
    }
  }, [user?.uid]);

  const calculateCategoryAmount = (categoryName, transactions) => {
    return transactions.reduce((total, transaction) => {
      if (transaction.category === categoryName) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  const totalAmount = categoryData.reduce((total, category) => total + category.amount, 0);
  
  const pieData = {
    labels: categoryData.map(category => `${category.name} (${((category.amount / totalAmount) * 100).toFixed(2)}%)`),
    datasets: [
      {
        label: 'Categories',
        data: categoryData.map(category => category.amount),
        backgroundColor: [
          'red',
          'blue',
          'green',
          'orange',
          'purple',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', 
          usePointStyle: true,
        },
      },
    },
  };


  return (
    <div className='containerr'>
        <h3>Category Distributions</h3>
      <Pie data={pieData} options={options}/>
    </div>
  );
}

export default PieChart;
