import React, { useState } from "react";
import TransactionCard from "../components/TransactionCard";
import "../assets/style/transactions.css";
import { useGlobalContext } from "../context/Context";
import DatePicker from "../components/DatePicker";

const Transactions = () => {
  const { transactions } = useGlobalContext();
  const [ startdate, setStartDate ] = useState(new Date());
  const getDate = (time) => {
    const t = new Date(time);

    return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
  };

  const renderCards = () => {
    let prevDate = "null";
    return (
      <>
        {transactions?.map((trans) => {
          let curDate = getDate(trans.time);
          let sameDate = prevDate === curDate;
          if (!sameDate) {
            prevDate = curDate;
          }

          return (
            <>
              {!sameDate && <h3 className="date">{curDate}</h3>}
              <TransactionCard
                amount={trans.amount}
                key={trans.id}
                category={trans.category}
                type={trans.type}
                note={trans.note}
                time={trans.time}
                mode={trans.mode}
              />
            </>
          );
        })}
      </>
    );
  };
  return (
    <div className="transactions">
      <div className="transaction-sort-container">
        <select name="transaction-sort" id="transactionSort" defaultValue="select">
        <option value="select">Select</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <DatePicker/>
      </div>
      {renderCards()}
    </div>
  );
};

export default Transactions;
