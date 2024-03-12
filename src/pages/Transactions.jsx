import React, { useState } from "react";
import TransactionCard from "../components/TransactionCard";
import "../assets/style/transactions.css";
import { useGlobalContext } from "../context/Context";
import DatePicker from "../components/DatePicker";

const Transactions = () => {
  const { transactions, categories, duration, setDuration } =
    useGlobalContext();
  const [mode, setMode] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("")
  const [startdate, setStartDate] = useState(new Date());

  const getDateString = (time) => {
    const t = new Date(time);

    return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
  };

  const renderCards = () => {
    let prevDate = "null";
    return (
      <>
        {transactions?.map((trans) => {
          let curDate = getDateString(trans.time);
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
        <select
          name="transaction-sort"
          className="transactionSort"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="all">All</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <select
          name="mode-sort"
          className="transactionSort"
          defaultValue="all"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="all">All</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="netbanking">Netbanking</option>
        </select>

        <select
          name="mode-sort"
          className="transactionSort"
          defaultValue="all"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
            <option value="all">All</option>
          {categories?.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            );
          })}
        </select>
        <select
          name="transaction-sort"
          className="transactionSort"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Expenses">Expenses</option>
          <option value="Income">Income</option>
        </select>

        <DatePicker />
      </div>
      {renderCards()}
    </div>
  );
};

export default Transactions;
