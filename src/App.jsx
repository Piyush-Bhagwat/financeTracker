import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Bottombar from './components/Bottombar';

// import Dashboard from './components/dashboard/Dashboard';

import Dashboard from "./components/dashboard/Dashboard";
import { addTransaction, getTransactions } from "./database/transaction.db";

function App() {
    return (
        <div className="flex flex-col justify-center items-center w-sm">
            <Header />
            <Outlet />
            
            <Navbar />
            <Dashboard></Dashboard>
        </div>
    );
}

export default App;
