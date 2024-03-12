import React, { useState } from "react";
import "../assets/style/datepicker.css";
import { useGlobalContext } from "../context/Context";

const DatePicker = () => {
    const { setDate, date } = useGlobalContext();

    const handleDateChange = (event) => {
        const dateValue = event.target.value;
        const d = new Date(dateValue);
        setDate(d);
    };

    return (
        <div className="custom-date-picker">
            <div className="datepicker-value">
                <input
                    type="date"
                    name="date-picker"
                    id="date-picker"
                    value={
                        date
                            ? date.toISOString().split("T")[0]
                            : ""
                    }
                    onChange={handleDateChange}
                />
            </div>
        </div>
    );
};

export default DatePicker;
