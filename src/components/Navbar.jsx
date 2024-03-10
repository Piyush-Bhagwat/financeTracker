import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { IoAddOutline } from "react-icons/io5";
import { IoBarChartOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import "../assets/style/nav.css";

const Navbar = () => {
    const menus = [
        {
            route: "",
            name: "Home",
            icon: <IoHomeOutline />,
            dis: "1%",
        },
        {
            route: "transactions",
            name: "Transactions",
            icon: <HiOutlineArrowsRightLeft />,
            dis: "21%",
        },
        {
            route: "add-transaction",
            name: "Add",
            icon: <IoAddOutline />,
            dis: "41%",
        },
        {
            route: "charts",
            name: "Charts",
            icon: <IoBarChartOutline />,
            dis: "61%",
        },
        {
            route: "wallet",
            name: "Wallet",
            icon: <IoWalletOutline />,
            dis: "81%",
        },
    ];

    const [active, setActive] = useState(0);

    const createMenus = () => {
        return (
            <>
                {menus.map((menu, i) => (
                    <Link
                        key={i}
                        className="nav-links"
                        to={`/${menu.route}`}
                        onClick={() => setActive(i)}
                    >
                        <span
                            className={`nav-icon ${
                                active == i ? "nav-active" : " "
                            }`}
                        >
                            {menu.icon}
                        </span>
                    </Link>
                ))}
            </>
        );
    };

    return (
        <nav className="nav-container">
            <span
                className="nav-blob"
                style={{ left: menus[active].dis }}
            ></span>

            {createMenus()}
        </nav>
    );
};

export default Navbar;
