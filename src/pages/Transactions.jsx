import React, { useEffect, useState } from "react";
import TransactionCard from "../components/TransactionCard";
import "../assets/style/transactions.css";
import { useGlobalContext } from "../context/Context";
import FiltersMenu from "../components/FiltersMenu";
import { LuFilter } from "react-icons/lu";

const Transactions = () => {
    const { transactions } = useGlobalContext();
    const [today, setToday] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getDateString = (time) => {
        const t = new Date(time);
        return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
    };

    useEffect(() => {
        const tday = new Date();
        const tdayString = `${tday.getDate()}/${
            tday.getMonth() + 1
        }/${tday.getFullYear()}`;
        console.log("gello");
        setToday(tdayString);
        console.log(tdayString);
    }, []);

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
                            {!sameDate && (
                                <h3 className="date">
                                    {curDate === today ? "Today" : curDate}
                                </h3>
                            )}
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
            <div className="btn-div">
                <button
                    className="filter-button"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <LuFilter />
                </button>
            </div>

            {isMenuOpen ? <FiltersMenu setIsMenuOpen={setIsMenuOpen} /> : null}
            {renderCards()}
        </div>
    );
};

export default Transactions;
