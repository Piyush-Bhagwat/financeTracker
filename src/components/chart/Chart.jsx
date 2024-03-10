import React from 'react';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/Context';

function Chart() {
  // const dateFormat = (date) => {
  //   return moment(date).format('DD/MM/YYYY')
  // }

  // const { incomes, expenses } = context()

  // const data = {
  //   labels: incomes.map((inc) => {
  //     const { date } = inc
  //     return dateFormat(date)
  //   }),

  //   datasets: [
  //     {
  //       label: 'Income',
  //       data: [
  //         ...incomes.map((income) => {
  //           const { amount } = income
  //           return amount
  //         })
  //       ],
  //       backgroundColor: 'green'
  //     },

  //     {
  //       label: 'expenses',
  //       data: [
  //         ...expenses.map((expense) => {
  //           const { amount } = expense
  //           return amount
  //         })
  //       ],
  //       backgroundColor: 'red'
  //     }

  //   ]
  // }

  return (
    <div className='container'>
      {/* <Line data={data}></Line> */}
      <h1>chart</h1>
    </div>
  );
}

export default Chart;
