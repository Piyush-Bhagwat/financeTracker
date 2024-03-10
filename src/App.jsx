import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Bottombar from "./components/Bottombar";

// import Dashboard from './components/dashboard/Dashboard';

import Dashboard from "./components/dashboard/Dashboard";
import { addCategory, getCategories } from "./database/user.db";

function App() {
    return (
        <div>
            <Header />
            <Outlet />
            <BottomBar />

            <Dashboard />
        </div>
    );
}

export default App;
