import React from 'react'
import Chart from '../chart/Chart'

function Dashboard() {
  return (
    <div className='container'>
      <h1>All Transactions</h1>
      <div className="statistics">
        <Chart></Chart>
      </div>
    </div>
  )
}

export default Dashboard
