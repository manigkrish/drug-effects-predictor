import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login/login'
import Signup from './Signup/signup'


import Home from './Home/home'
import Profile from './Profile/Profile'

import DashboardPage from './DashboardPage/DashboardPage'
import LandingPage from './LandingPage/LandingPage'

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// const Index = () => {
//   const [sessionVar, setsessionVar] = useState(false)
//   };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Index/> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Home Page */}
        <Route path="/login" element={<Login />} /> {/* Login Page */}
        <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
        <Route path="/home" element={<Home />} /> {/* Home Page */}
        <Route path="/myprofile" element={<Profile />} /> {/* Profile Page */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route path="/landingpage" element={<LandingPage />} /> */}

        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
