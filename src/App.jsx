import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

import BottomBar from "./components/Bottombar";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
    return (
        <div>
            <Header />
            <Outlet />
            <BottomBar />

            {/* <Dashboard /> */}
        </div>
    );
}

export default App;
