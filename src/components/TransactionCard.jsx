import React from "react";
import "../assets/style/transactioncard.css";

const TransactionCard = () => {
  return (
    <div className="transaction-card">
      <div className="transaction">
        <div className="icon">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGnItOkVLxpZ_9tdde71oIyeYXzBpKowTHLw&usqp=CAU"
            alt="icon"
          />
        </div>
        <div className="details">
          <span>Food</span>
          <span>comment</span>
        </div>
        <div className="amount">
          <span> + ₹ 1000</span>
        </div>
      </div>
      <div className="time-mode">
        <span>3.14 pm</span>
        <span>Cash</span>
      </div>
    </div>
  );
};

export default TransactionCard;
