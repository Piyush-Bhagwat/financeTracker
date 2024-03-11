import React from "react";
import "../assets/style/transactioncard.css";

const TransactionCard = () => {
  return (
    <div className="transaction-card">
      <div className="icon">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGnItOkVLxpZ_9tdde71oIyeYXzBpKowTHLw&usqp=CAU" alt="icon" />
      </div>
      <div className="details">
        <div className="type-mode">
          <span>Food</span>
          <span>Cash</span>
        </div>
        <span>comment</span>
      </div>
      <div className="amount-time">
        <span>₹ 1000</span>
        <span>3.14 pm</span>
      </div>
    </div>
  );
};

export default TransactionCard;
