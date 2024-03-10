import React, { useState } from 'react';
import "../assets/style/addtransaction.css"

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash');
  const [transactionCategory, setTransactionCategory] = useState('shopping');
  const [transactionType, setTransactionType] = useState('expense');

  const handleNumberClick = (value) => {
    setAmount(amount + value);
  };

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Submit the expense data
    console.log(`Amount: ₹${amount}, Comment: ${comment}`);
    // Reset the fields
    setAmount('');
    setComment('');
  };

  return (
    <div className="add-transaction">
      <div className="dropdowns">
        <select
          className="transaction-dropdown"
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="upi">Upi</option>
          <option value="netbanking">Netbanking</option>
        </select>
        <select
          className="category-dropdown"
          value={transactionCategory}
          onChange={(e) => setTransactionCategory(e.target.value)}
        >
          <option value="shopping">Shopping</option>
          <option value="food">Food</option>
          <option value="stationary">Stationary</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="transaction-type">
        <select
          className="type-dropdown"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div className="amount-entry">
        <input
          type="text"
          className="amount-input"
          value={`₹${amount}`}
          readOnly
        />
        <input
          type="text"
          className="comment-input"
          placeholder="Add comment..."
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <div className="keypad">
        {'1234567890'.split('').map((number) => (
          <button className="number-btn" key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
        <button className="backspace-btn" onClick={handleBackspace}>
          X
        </button>
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
       Add Transaction
      </button>
    </div>
  );
};

export default AddTransaction;
