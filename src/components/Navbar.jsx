import React, { useEffect, useState } from "react";
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
    <nav className="flex sticky bottom-0 bg-gray-200 border-1 max-h-[4.4rem] px-6 rounded-t-xl max-w-sm">
      <ul className="flex relative">
        <span className={`${active === 2 ? "bg-pink-600" : "bg-yellow-600" }  duration-500 ${menus[active].dis} border-4 border-gray-900 h-16 w-16 absolute -top-5 rounded-full flex items-center justify-center`}>
           
        </span>
        {menus.map((menu, i) => (
          <li key={i} className="w-16">
            <Link
              to={`/${menu.route}`}
              className={`flex flex-col items-center justify-center pt-6 ${i === active ? 'text-blue-500' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className={`text-xl cursor-pointer duration-500 z-40 ${i === active ? '-mt-6 mb-2 text-white' : 'mb-1'}`}>{menu.icon}</span>
              <span className={`text-bold ${active === i ? 'opacity-100 transition-opacity translate-y-4' : 'opacity-0 -translate-y-10 transition-opacity'} text-sm`}>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
