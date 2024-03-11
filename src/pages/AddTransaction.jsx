import React, { useState } from "react";
import "../assets/style/addtransaction.css";
import Keypad from "../components/Keypad";
import { useGlobalContext } from "../context/Context";
import { addTransaction } from "../database/transaction.db";

const AddTransaction = () => {
    const { categories, user } = useGlobalContext();
    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");
    const [paymentMode, setPaymentMode] = useState("cash");
    const [transactionCategory, setTransactionCategory] = useState(
        categories?.at(0)?.id
    );
    const [transactionType, setTransactionType] = useState("expense");

    const handleNumberClick = (value) => {
        setAmount(amount + value);
    };

    const handleBackspace = () => {
        setAmount(amount.slice(0, -1));
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleClear = () => {
        setAmount("");
    };

    const handleSubmit = async () => {
        // Submit the expense data
        const data = {
            amount,
            mode: paymentMode,
            note: comment,
            type: transactionType,
            time: Date.now(),
            category: transactionCategory,
        };

        await addTransaction(user?.uid, data);
        console.log(`added a transaction`);

        // Reset the fields
        setAmount("");
        setComment("");
    };

    const renderCatergories = () => {
        return (
            <>
                {categories?.map((cat) => {
                    return (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    );
                })}
            </>
        );
    };

    const getColor = () => {
        const obj = categories?.find((cat) => cat.id == transactionCategory);
        return obj?.color;
    };

    return (
        <div className="add-transaction">
            <div className="dropdowns">
                <select
                    className="transaction-dropdown"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">Upi</option>
                    <option value="netbanking">Netbanking</option>
                </select>

                <select
                    className="category-dropdown"
                    value={transactionCategory}
                    style={{ backgroundColor: getColor() }}
                    onChange={(e) => setTransactionCategory(e.target.value)}
                >
                    {renderCatergories()}
                    <option value="">
                       Add More..
                    </option>
                </select>
            </div>
            <div className="transaction-type">
                <select
                    className="type-dropdown"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>
            <div className="amount-entry">
                <input
                    type="text"
                    className="amount-input"
                    value={`₹${amount}`}
                    readOnly
                />
                <input
                    type="text"
                    className="comment-input"
                    placeholder="Add comment..."
                    value={comment}
                    onChange={handleCommentChange}
                />
            </div>
            <Keypad
                handleNumberClick={handleNumberClick}
                handleBackspace={handleBackspace}
                handleClear={handleClear}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default AddTransaction;
