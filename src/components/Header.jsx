import React, { useState } from "react";
import "../assets/style/header.css";
import { logout } from "../database/auth.db";
import { useGlobalContext } from "../context/Context";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, setUser } = useGlobalContext();

    const handleImageClick = () => {
        setShowDropdown((p) => !p);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        localStorage.removeItem("user");
        console.log("Logout clicked");
    };

    return (
        <header className="header">
            <div className="header-logo">logo</div>
            <div
                className="header-img"
                onClick={user !== null ? handleImageClick : null}
            >
                {user === null ? (
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5DWWYRWd7uysUpQK690_mjjaBPgll2-V0Q&usqp=CAU"
                        alt="profile"
                    />
                ) : (
                    <img src={`${user.photoURL}`} alt="profile" />
                )}
                {showDropdown && (
                    <div className="dropdown">
                        <button onClick={() => handleLogout()}>Logout</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
