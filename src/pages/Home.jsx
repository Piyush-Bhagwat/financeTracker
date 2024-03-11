import React from "react";
import { useGlobalContext } from "../context/Context";
import TransactionCard from "../components/TransactionCard";
import { Link } from "react-router-dom";
import "../assets/style/home.css";
import { getAllIncome , getAllExpenses } from "../database/transaction.db";

const Home = () => {
  const {
    user,
    transactions,
    totalIncome,
    totalExpenses,
    totalBalance,
    setActive,
  } = useGlobalContext();
   
  const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();


  return (
    <div className="home">
      <span className="home-header">Welcome, {user?.name}</span>
      <div className="balance">
        <span>Available Balance</span>
        <span>₹ {}</span>
      </div>
      <div className="summary">
        <div className="income">
          <span>Income</span>
          <span>₹ {getAllIncome(user.id , month , year)}</span>
        </div>
        <div className="expenses">
          <span>Expenses</span>
          <span>₹ {}</span>
        </div>
      </div>
      <div className="recent-transactions">
        <span>Recent Transactions</span>
        <Link
          to="/transactions"
          className="view-all"
          onClick={() => setActive(1)}
        >
          See All
        </Link>
        {transactions?.map((trans, index) =>
          index < 3 ? (
            <TransactionCard
              key={trans.id}
              amount={trans.amount}
              category={trans.category}
              type={trans.type}
              note={trans.note}
              time={trans.time}
              mode={trans.mode}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Home;
