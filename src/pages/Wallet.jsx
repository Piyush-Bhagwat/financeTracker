import React from 'react';
import "../assets/style/wallet.css"

const Wallet = () => {
  return (
    <div className="wallet-container">
      <header className="wallet-header">
        <h1>Wallets</h1>
      </header>
      <div className="wallet-info">
        <div className="wallet primary">
          <div className="wallet-icon">🏦</div>
          <div className="wallet-details">
            <p>Checking ***11365</p>
            <p>Swiss Bank</p>
          </div>
        </div>
        <div className="wallet secondary">
          <div className="wallet-icon">📧</div>
          <div className="wallet-details">
            <p>devmulkalwar95@gmail.com</p>
            <p>Dev Mulkalwar</p>
          </div>
        </div>
      </div>
      <button className="add-wallet-btn">Add New Wallet</button>
    </div>
  );
}

export default Wallet