import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './pages/Components/Navbar';
import Footer from './pages/Components/Footer';

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />

    </div>
  );
};

export default AppLayout;
