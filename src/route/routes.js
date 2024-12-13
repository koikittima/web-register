import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import LoginForm from '../components/auth/login-form';
import NavbarComponent from '../components/widget/navbar';

const AppRoutes = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
