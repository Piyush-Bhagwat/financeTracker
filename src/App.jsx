import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

import BottomBar from "./components/Bottombar";
import { useGlobalContext } from "./context/Context";
import Login from "./pages/Login";
import { getAllExpenses } from "./database/transaction.db";

function App() {
    const { user } = useGlobalContext();
    return (
        <div>
            <Header />
            {user === null ? (
                <Login />
            ) : (
                <>
                    <main>
                        <Outlet />
                    </main>
                    <div className="bottom-filling"></div>

                    <BottomBar />
                </>
            )}
        </div>
    );
}

export default App;
