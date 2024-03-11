import React, { useState } from 'react';
import Keypad from './Keypad';

const Model = ({ amount, setAmount, setIsModelOpen }) => {
    const [amt, setAmt] = useState(amount === 0 ? "" : amount);
  
    const handleNumberClick = (value) => {
      setAmt(prevAmt => prevAmt + value);
    };
  
    const handleBackspace = () => {
      setAmt(prevAmt => prevAmt.slice(0, -1));
    };
  
    const handleClear = () => {
      setAmt("");
    };
  
    const handleSubmit = () => {
      setAmount(amt);
      setIsModelOpen(false);
    };
  
    return (
      <div>
        <div>
          <input
            type="text"
            className="amount-input"
            value={`₹${amt}`}
            readOnly
          />
        </div>
        <div>
          <Keypad
            handleNumberClick={handleNumberClick}
            handleBackspace={handleBackspace}
            handleClear={handleClear}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    );
  };
  
export default Model;