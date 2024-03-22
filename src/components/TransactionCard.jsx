import React, { useEffect, useRef, useState } from "react";
import "../assets/style/transactioncard.css";
import { useGlobalContext } from "../context/Context";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { deleteTransaction } from "../database/transaction.db";

const TransactionCard = ({ type, mode, category, amount, note, id, time }) => {
  const { categories, uid } = useGlobalContext();
  const [control, setControl] = useState(false);

  const cardRef = useRef(null);

  let color, emoji, categoryName;

  const readCategory = () => {
    const cat = categories?.find((cat) => cat.id === category);
    categoryName = cat?.name;
    emoji = cat?.emoji;
    color = cat?.color;
  };

  const getTime = () => {
    const date = new Date(time);
    const hour = date.getHours();
    const min = date.getMinutes();
    time = `${hour % 12 !== 0 ? hour % 12 : "12"}:${
      min < 10 ? "0" + min : min
    } ${hour >= 12 ? "pm" : "am"}`;
  };

  getTime();
  readCategory();

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setControl(false);
    }
  };

  const handleDelete = async () => {
    await deleteTransaction(uid, id);
    window.location.reload();
  };

  const handleEdit = () => {
    console.log("edit button clicked");
  };

  // Add event listener on component mount, remove on unmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={`transaction-card ${control ? "transaction-active" : " "}`}
      onClick={() => setControl((p) => !p)}
      ref={cardRef}
    >
      <div
        className="icon"
        style={{
          backgroundColor: type === "income" ? "#2a8c2a" : color,
        }}
      >
        {type === "income" ? "🤑" : emoji}
      </div>

      <div className="details">
        <div className="up">
          <span className="cat">
            {type === "income" ? "Income" : categoryName}
          </span>
          <div className="amount">
            <span className="mode">{mode}</span>
            <span
              style={{
                color: type === "income" ? "#2a8c2a" : "#e94040",
              }}
            >
              {`${type === "income" ? "+" : "-"}${amount}`}
            </span>
          </div>
        </div>
        {!control && (
          <div className="down">
            <span className="note">{note}</span>
            <span className="time">{time}</span>
          </div>
        )}
        {control && (
          <div className="transaction-control">
            <button onClick={handleDelete}>
              <MdDeleteForever /> Delete
            </button>
            <button>
              <FaPencilAlt /> Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
