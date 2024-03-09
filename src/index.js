import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//pages imports
import Home from './pages/Home';
import Login from './pages/Login';
import Charts from './pages/Charts';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Wallet from './pages/Wallet';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error/>,
    children : [
      { index: true, element: <Home />},
      { path: "login", element: <Login /> },
      { path: "transactions", element: <Transactions /> },
      { path: "add-transaction", element: <AddTransaction /> },
      { path: "charts", element: <Charts /> },
      { path: "wallet", element: <Wallet /> },
    ]

  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

