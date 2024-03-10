import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/Context';
import { Chart } from 'chart.js/auto';
import './dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartComponent from '../chart/Chart';
// import Analytics from '../analytics/Analytics';
import {Progress} from 'antd'

function Dashboard() {
  const chartRef = useRef(null);
  const { totalIncome, totalExpenses } = useGlobalContext();

  const incomePercentage = (totalIncome / (totalIncome + totalExpenses)) * 100;
  const expensePercentage = (totalExpenses / (totalIncome + totalExpenses)) * 100;

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['Total Income', 'Total Expenses'],
        datasets: [{
          label: 'Amount',
          data: [totalIncome, totalExpenses],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, [chartRef, totalIncome, totalExpenses]);

  return (
    <div className='container'>
      <h1>All Transactions</h1>
      <div className="statistics">
        <div className="chart">
          <h2>Total Income Vs Total Expenses</h2>
          <canvas ref={chartRef} ></canvas>
        </div>

        <div className="chartLine">
          <div className="line">
            <h2>Daily Expenses</h2>
            <ChartComponent></ChartComponent>
          </div>
        </div>

        <div className="progress">
          <div className="circle">
          <h2>Total Income</h2>
            <p>
              <Progress type='circle' strokeColor={'green'} percent={incomePercentage}></Progress>
              <FontAwesomeIcon icon="fas fa-rupee-sign" />
              {totalIncome}
            </p>
          </div>

          <div className="expense">
            <h2>Total Expenses</h2>
            <p>
              <Progress type='circle' strokeColor={'green'} percent={expensePercentage}></Progress>
              <FontAwesomeIcon icon="fas fa-rupee-sign" />
              {totalExpenses}
            </p>
          </div>

          {/* <div className="balance">
            <h2>Total Balance</h2>
            <p>
              <Progress type='circle' strokeColor={'green'} percent={totalBalance}></Progress>
              <FontAwesomeIcon icon="fas fa-rupee-sign" />
              {totalBalance}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;