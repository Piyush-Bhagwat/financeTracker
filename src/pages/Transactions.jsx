import React from "react";
import TransactionCard from "../components/TransactionCard";
import "../assets/style/transactions.css";
import { useGlobalContext } from "../context/Context";

const Transactions = () => {
    const { transactions } = useGlobalContext();

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
    return <div className="transactions">{renderCards()}</div>;
};

export default Transactions;
