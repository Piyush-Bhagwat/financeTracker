import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Bottombar from "./components/Bottombar";

// import Dashboard from './components/dashboard/Dashboard';

import Dashboard from "./components/dashboard/Dashboard";
import { addTransaction, getTransactions } from "./database/transaction.db";
import { setBalance } from "./database/user.db";

function App() {
    return (
        <div >
            <Header />
            <Outlet />
            <Bottombar />

            <Dashboard></Dashboard>

        </div>
    );
}

export default App;
