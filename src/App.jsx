import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';

import Dashboard from './components/dashboard/Dashboard';


function App() {
  return (
    <div className='flex flex-col justify-center items-center w-sm'>
     <Header/>
     < Outlet/>
     < Navbar/>
      <Dashboard></Dashboard>

    </div>
  );
}

export default App;
