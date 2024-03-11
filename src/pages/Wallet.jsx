import React, { useEffect, useState } from "react";
import "../assets/style/wallet.css";
import Model from "../components/Model";


const Wallet = () => {
  const [totalAmt, setTotalAmt] = useState(0);
  const [cashAmt, setCashAmt] = useState(0);
  const [bankAmt, setBankAmt] = useState(0);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const openModel = (type) => {
    setIsModelOpen(true);
    setSelectedType(type);
  };

  useEffect(() => {
    // Convert amount values to integers before performing addition
    const total = parseInt(cashAmt) + parseInt(bankAmt);
    setTotalAmt(total);
  }, [cashAmt, bankAmt]);

  return (
    <div className="wallet-container">
      <header className="wallet-header">
        <h1>Wallets</h1>
        <h1>{`₹ ${totalAmt}`}</h1>
      </header>


      <div className="wallet primary">
        <div className="wallet-icon">🏦</div>
        <div className="wallet-details">
          <span>Bank</span>
          <span>{`₹${bankAmt}`}</span>
        </div>
        <div className="add-amt">
          <button onClick={() => openModel("bank")}>Add amount</button>
        </div>
      </div>

      <div className="wallet primary">
        <div className="wallet-icon">💵</div>
        <div className="wallet-details">
          <span>Cash</span>
          <span>{`₹${cashAmt}`}</span>
        </div>
        <div className="add-amt">
          <button onClick={() => openModel("cash")}>Add amount</button>
        </div>
      </div>

      {isModelOpen && (
        <Model
          amount={selectedType === "cash" ? cashAmt : bankAmt}
          setAmount={selectedType === "cash" ? setCashAmt : setBankAmt}
          setIsModelOpen={setIsModelOpen}
        />
      )}
    </div>
  );
};

export default Wallet;
