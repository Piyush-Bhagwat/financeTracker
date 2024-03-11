import React from "react";
import "../assets/style/transactioncard.css";
import { useGlobalContext } from "../context/Context";

const TransactionCard = ({ type, mode, category, amount, note, time }) => {
    const { categories } = useGlobalContext();
    let color, emoji;
    const readCategory = () => {
        const cat = categories?.find((cat) => cat.id == category);
        category = cat.name;
        emoji = cat.emoji;
        color = cat.color;
    };

    const getTime = () => {
        const date = new Date(time);

        const hour = date.getHours();
        const min = date.getMinutes();

        time = `${hour % 12 !== 0 ? hour % 12 : "12"}:${
            min < 9 ? "0" + min : min
        } ${hour >= 12 ? "pm" : "am"}`;
    };
    getTime();
    readCategory();

    return (
        <div className="transaction-card">
            <div className="icon" style={{ backgroundColor: color }}>
                {emoji}
            </div>

            <div className="details">
                <div className="up">
                    <span className="cat">{category}</span>
                    <span className="amount">
                        <span className="mode">{mode}</span>
                        {` ${type === "income" ? "+" : "-"}${amount}`}
                    </span>
                </div>
                <div className="down">
                    <span className="note">{note}</span>
                    <span className="time">{time}</span>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
