import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";
import TransactionCard from "../components/TransactionCard";
import { Link } from "react-router-dom";
import "../assets/style/home.css";
import { getAllIncome , getAllExpenses } from "../database/transaction.db";
import { months } from "moment";

const Home = () => {
  const {
    user,
    transactions,
    setActive,
    uid
  } = useGlobalContext();
  const [data, setData] = useState({
    totalBalance : 0,
    totalIncome : 0,
    totalExpenses : 0,
  });
   
  useEffect(()=>{
    const fetchData = async() =>{
       const income = await getAllIncome(uid , 2, 2024);
       const expense = await getAllExpenses(uid, 2, 2024);
       const total = user?.bankBal + user?.cashBal;

       setData({
        totalBalance : total ,
        totalIncome : income,
        totalExpenses : expense ,
      });
    }
    fetchData();
  })

  return (
    <div className="home">
      <span className="home-header">Welcome, {user?.name}</span>
      <div className="balance">
        <span>Available Balance</span>
        <span>₹ { data.totalBalance}</span>
      </div>
      <div className="summary">
        <div className="income">
          <span>Income</span>
          <span>₹ {data.totalIncome}</span>
        </div>
        <div className="expenses">
          <span>Expenses</span>
          <span>₹ { data.totalExpenses}</span>
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
