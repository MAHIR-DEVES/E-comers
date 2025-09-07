import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="bg-purple-50">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
