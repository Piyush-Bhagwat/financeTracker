import React from 'react';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/Context';

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  // Assuming incomes and expenses are arrays of numbers representing amounts over time

  const data = {
    labels: ['January', 'February', 'March'], // Example labels for months
    datasets: [
      {
        label: 'Income',
        data: incomes, // Array of income amounts
        fill: false,
        borderColor: 'green',
        backgroundColor:'green',
        color:'white'
      },
      {
        label: 'Expenses',
        data: expenses, // Array of expense amounts
        fill: false,
        borderColor: 'red',
        backgroundColor:'red',
        color:'white'
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // Set label color to white
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
      <h3>Income and Expenses Over Time</h3>
      <Line data={data} options={options} />
    </div>
  );

}

export default Chart;
