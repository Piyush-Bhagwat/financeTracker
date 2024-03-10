import React, { useState } from "react";
import "../assets/style/bottombar.css";
import { Link } from "react-router-dom";

import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { IoAddOutline } from "react-icons/io5";
import { IoBarChartOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";

const Bottombar = () => {
  const menus = [
    { route: "", icon: <IoHomeOutline /> },
    { route: "transactions", icon: <HiOutlineArrowsRightLeft /> },
    { route: "add-transaction", icon: <IoAddOutline /> },
    { route: "charts", icon: <IoBarChartOutline /> },
    { route: "wallet", icon: <IoWalletOutline /> }
  ];

  const [active, setActive] = useState(0);

  const createMenus = () => {
    return menus.map((menu, i) => (
      <Link
        key={i}
        to={`/${menu.route}`}
        className={`nav-icon ${active === i ? "nav-active" : ""}`}
        onClick={() => setActive(i)}
      >
        {menu.icon}
      </Link>
    ));
  };
  

  return (
    <nav className="bottom-bar">
      {createMenus()}
    </nav>
  );
};

export default Bottombar;
