import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { IoAddOutline } from "react-icons/io5";
import { IoBarChartOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";

const Navbar = () => {
  const menus = [
    { route: "", name: "Home", icon: <IoHomeOutline />, dis: "translate-x-0" },
    {
      route: "transactions",
      name: "Transactions",
      icon: <HiOutlineArrowsRightLeft />,
      dis: "translate-x-16",
    },
    {
      route: "add-transaction",
      name: "Add",
      icon: <IoAddOutline />,
      dis: "translate-x-32",
    },
    {
      route: "charts",
      name: "Charts",
      icon: <IoBarChartOutline />,
      dis: "translate-x-48",
    },
    {
      route: "wallet",
      name: "Wallet",
      icon: <IoWalletOutline />,
      dis: "translate-x-64",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <nav>
      <ul>
        <span></span>
        {menus.map((menu, i) => (
          <li key={i}>
            <Link
              to={`/${menu.route}`}
              onClick={() => setActive(i)}
            >
              <span>{menu.icon}</span>
              <span>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
