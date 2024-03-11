import React, { useState } from "react";
import "../assets/style/header.css";
import { logout } from "../database/auth.db";
import { useGlobalContext } from "../context/Context";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { setUser } = useGlobalContext();

    const handleImageClick = () => {
        setShowDropdown((p) => !p);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        console.log("Logout clicked");
    };

    return (
        <header className="header">
            <div className="header-logo">logo</div>
            <div className="header-img" onClick={handleImageClick}>
                <img
                    src="https://media.istockphoto.com/id/1265032285/photo/portrait-of-young-girl-with-clean-skin-and-soft-makeup.jpg?s=612x612&w=0&k=20&c=GcrInK2xkdxcInX0quxPrdFGkv8DXXDPShUia2T1pv4="
                    alt="profile"
                />
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
