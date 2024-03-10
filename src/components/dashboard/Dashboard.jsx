import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/Context';
import { Chart } from 'chart.js/auto';
import '../../assets/style/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartComponent from '../chart/Chart';
import { Progress } from 'antd'

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
        plugins: {
          legend: {
            labels: {
              color: 'white', // Set label color to white
            },
          },
        },
        responsive: true,
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
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.2)", // Set the color of the grid lines to white
            },
            ticks: {
              color: 'rgba(240, 240, 240, 0.5)' // Make x-axis labels bold
            },
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

          <h2>Overall Percentage</h2>
        <div className="progress">
          <div className="circle">
            <h3>Total Income</h3>
            <p>
              <Progress type='circle' strokeColor={'green'} percent={incomePercentage} format={() => (
                <span style={{ color: 'white' }}>{`${incomePercentage}%`}</span>
              )}></Progress>
              <FontAwesomeIcon icon="fas fa-rupee-sign" />
              {totalIncome}
            </p>
          </div>

          <div className="circle">
            <h3>Total Expenses</h3>
            <p>
              <Progress type='circle' strokeColor={'green'} percent={expensePercentage} format={() => (
                <span style={{ color: 'white' }}>{`${incomePercentage}%`}</span>
              )}></Progress>
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
