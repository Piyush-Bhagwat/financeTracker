import React from "react";
import "../assets/style/wallet.css";
import Keypad from "../components/Keypad";
import WalletCard from "../components/WalletCard";

const Wallet = () => {
  return (
    <div className="wallet-container">
      <header className="wallet-header">
        <h1>Wallets</h1>
      </header>
      {/* <WalletCard /> */}
      <div className="wallet primary">
        <div className="wallet-icon">🏦</div>
        <div className="wallet-details">
          <span>Bank</span>
          <span>₹ 10000</span>
        </div>
        <div className="add-amt">
          <button>Add amount</button>
        </div>
      </div>

      <div className="wallet primary">
        <div className="wallet-icon">💵</div>
        <div className="wallet-details">
          <span>Cash</span>
          <span>₹ 10000</span>
        </div>
        <div className="add-amt">
          <button>Add amount</button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
