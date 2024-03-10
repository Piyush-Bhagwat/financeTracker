import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import BottomBar from "./components/Bottombar";

// import Dashboard from './components/dashboard/Dashboard';

import Dashboard from "./components/dashboard/Dashboard";
import { addTransaction, getTransactions } from "./database/transaction.db";
import { setBalance } from "./database/user.db";

function App() {
    return (
        <div className="flex flex-col justify-center items-center w-sm">
            <Header />
            <Outlet />
            <button
                onClick={() =>
                    setBalance("jFL5c73O90dglYq40RyBirnztHF3", 21234)
                }
            >
                Hello
            </button>
            <BottomBar />
            <Dashboard></Dashboard>
        </div>
    );
}

export default App;
