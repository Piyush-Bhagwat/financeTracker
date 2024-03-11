import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

import BottomBar from "./components/Bottombar"
import { useGlobalContext } from "./context/Context";
import Login from "./pages/Login";

function App() {
    const {user} = useGlobalContext();
    return (
        <div>
            <Header />
            { user === null ?
            <Login/>
            :
            <>
            <Outlet />
            <BottomBar />
            </>
            }

        </div>
    );
}

export default App;
