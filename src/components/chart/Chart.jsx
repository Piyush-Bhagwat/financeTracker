import React from 'react';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/Context';

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: ['January', 'February', 'March'], 
    datasets: [
      {
        label: 'Income',
        data: incomes, 
        fill: false,
        borderColor: 'green',
        backgroundColor: 'green', 
        tension:.2
      },
      {
        label: 'Expenses',
        data: expenses, 
        fill: false,
        borderColor: 'red',
        backgroundColor: 'red', 
        tension:.2
      },
    ],
  };

  return (
    <div className='chart'>
      <h1>Income and Expenses Over Time</h1>
      <Line data={data} />
    </div>
  );
}

export default Chart;
