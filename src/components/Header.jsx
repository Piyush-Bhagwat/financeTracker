import React, { useState } from 'react';
import "../assets/style/header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleImageClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Handle logout functionality here
    // For example: clear session, redirect to login page, etc.
    // You can implement the logout functionality based on your application's requirements
    console.log("Logout clicked");
  };

  return (
    <header className='header'>
        <div className='header-logo'>
            logo
        </div>
        <div className='header-img' onClick={handleImageClick}>
            <img src="https://media.istockphoto.com/id/1265032285/photo/portrait-of-young-girl-with-clean-skin-and-soft-makeup.jpg?s=612x612&w=0&k=20&c=GcrInK2xkdxcInX0quxPrdFGkv8DXXDPShUia2T1pv4=" alt="profile" />
            {showDropdown && (
              <div className="dropdown">
                <button>Logout</button>
              </div>
            )}
        </div>
    </header>
  );
};

export default Header;
