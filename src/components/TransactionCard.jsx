import React from "react";
import "../assets/style/transactioncard.css";

const TransactionCard = () => {
    return (
        <div className="transaction-card">
            <div className="icon">🍽️</div>

            <div className="details">
                <div className="up">
                    <span className="cat">Food</span>
                    <span className="amount">
                        <span className="mode">cash</span> +1000
                    </span>
                </div>
                <div className="down">
                    <span className="note">Dahi Samosa</span>
                    <span className="time">3.14 pm</span>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
