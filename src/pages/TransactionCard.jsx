import React from 'react'
import '../assets/style/transactionCard.css'
function TransactionCard() {
  return (
    <div className='container'>
      <div className="innerContainer">
        <div className="shopping">
          <div className="icon">

          </div>
          <div className="content">
            <h3>Shopping</h3>
            <p>Buy a dress</p>
          </div>
          <div className="amount">
            <h3>30</h3>
            <p>07:30PM</p>
          </div>
        </div>
        <div className="stationary">

        </div>
        <div className="food">

        </div>
        <div className="hospital">

        </div>
        <div className="travelling">

        </div>
      </div>
    </div>
  )
}

export default TransactionCard
