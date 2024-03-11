import React, { useEffect, useState } from "react";
import "../assets/style/header.css";
import { logout } from "../database/auth.db";
import { useGlobalContext } from "../context/Context";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setUser,active, setActive  } = useGlobalContext();

    const handleImageClick = () => {
        setShowDropdown((p) => !p);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        localStorage.removeItem("user");
        console.log("Logout clicked");
    };
    const currentRoute = window.location.pathname.substring(1);
    useEffect(()=>{
        if(currentRoute===""){
            setActive(0);
        }
    },[currentRoute])

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" onClick={()=>setActive(0)}>
          <img className="logo-img" src={logo} alt="logo" />
          <span>FinGo</span>
        </Link>
      </div>
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
