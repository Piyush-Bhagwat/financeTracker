import React from "react";
import TransactionCard from "../components/TransactionCard";
import "../assets/style/transactions.css";
import { useGlobalContext } from "../context/Context";

const Transactions = () => {
    const { transactions } = useGlobalContext();

    const renderCards = () => {
        return (
            <>
                {transactions?.map((trans) => {
                    return (
                        <TransactionCard
                            amount={trans.amount}
                            key={trans.id}
                            category={trans.category}
                            type={trans.type}
                            note={trans.note}
                            time={trans.time}
                            mode = {trans.mode}
                        />
                    );
                })}
            </>
        );
    };
    return <div className="transactions">{renderCards()}</div>;
};

export default Transactions;
