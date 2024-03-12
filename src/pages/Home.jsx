import React from "react";
import { useGlobalContext } from "../context/Context";
import TransactionCard from "../components/TransactionCard";
import { Link } from "react-router-dom";
import "../assets/style/home.css";

const Home = () => {
  const { user, transactions, totalIncome, totalExpenses, totalBalance ,setActive } =
    useGlobalContext();

  return (
    <div className="home">
      <span className="home-header">Welcome, {user?.name}</span>
      <div className="balance">
        <span>Available Balance</span>
        <span>₹ {totalBalance}</span>
      </div>
      <div className="summary">
        <div className="income">
          <span>Income</span>
          <span>₹ {totalIncome}</span>
        </div>
        <div className="expenses">
          <span>Expenses</span>
          <span>₹ {totalExpenses}</span>
        </div>
      </div>
      <div className="recent-transactions">

        <div className="see-all">
          <span>Recent Transactions</span>
          <Link to="/transactions" className="sm-btn" onClick={()=>setActive(1)}>
            See All
          </Link>
        </div>
        {transactions?.slice(0, 3)?.map((trans) =>   //slice the array to limmit only 3 result 
          <TransactionCard
            key={trans.id}
            amount={trans.amount}
            category={trans.category}
            type={trans.type}
            note={trans.note}
            time={trans.time}
            mode={trans.mode}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
