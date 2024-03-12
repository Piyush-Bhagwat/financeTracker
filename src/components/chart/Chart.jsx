import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/Context";
import { getAllIncome, getAllExpenses } from "../../database/transaction.db";
import { range } from "lodash";

function Chart() {
    const { incomes, uid, expenses, date, duration } = useGlobalContext();
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //thoda fix krdiya hai
            const incomeData = await getAllIncome(uid, date, duration);
            const expenseData = await getAllExpenses(uid, date, duration);

            const allData = Math.max(
                incomeData.data.length,
                expenseData.data.length
            );
            const monthNames = range(1, allData + 1);

            setLabels(monthNames);
        };

        fetchData();
    }, []);

    const reverseArray = (ar) => {
        // const ar = [];

        let newAr = ar
            .slice()
            .reverse()
            .map((sth) => sth.amount);

        // console.log("new ar", newAr)
        return newAr;
    };

    const data = {
        labels, // Example labels for months
        datasets: [
            {
                label: "Income",
                data: incomes ? reverseArray(incomes) : [],
                fill: false,
                borderColor: "green",
                backgroundColor: "green",
                color: "white",
                tension: 0.3,
            },
            {
                label: "Expenses",
                data: expenses ? reverseArray(expenses) : [],
                fill: false,
                borderColor: "red",
                backgroundColor: "red",
                color: "white",
                tension: 0.5,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(240, 240, 240, 0.5)", // Lightish white color for x-axis grid lines
                },
                ticks: {
                    color: "rgba(240, 240, 240, 0.8)", // Lightish white color for x-axis labels
                },
            },
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.2)", // Change the color of the y-axis grid lines to white
                },
                ticks: {
                    color: "rgba(240, 240, 240, 0.5)", // Make x-axis labels bold
                },
            },
        },
    };
    return (
        <div className="container">
            <Line data={data} options={options} />
        </div>
    );
}

export default Chart;
