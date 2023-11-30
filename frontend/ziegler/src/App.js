import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerLogin from './pages/SellerLogin'
import SellerSignup from './pages/SellerSignup'
import CustomerLogin from './pages/CustomerLogin'
import CustomerSignup from './pages/CustomerSignup'
import SellerProfile from './pages/SellerProfile';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

import './App.css';

import AuctionInterface from './pages/AuctionInterface';
import Messages from './pages/Messages';

function App() {

  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        if (userData.type === "seller") {
          navigate('/sellerprofile')
        }
        else {
          navigate('/auctioninterface')
        }
      } else { 
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/");
      }
    }, []);

    return (
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/sellerlogin" element={<SellerLogin />}></Route>
        <Route exact path="/sellersignup" element={<SellerSignup />}></Route>
        <Route exact path="/customerlogin" element={<CustomerLogin />}></Route>
        <Route exact path="/customersignup" element={<CustomerSignup />}></Route>
        <Route exact path="/sellerprofile" element={<SellerProfile />}></Route>
        <Route exact path="/auctioninterface" element={<AuctionInterface />}></Route>
        <Route exact path="/messages" element={<Messages />}></Route>
    

      </Routes>
    )
  }


  return (
    <div className=''>
      <Router>
        <Navbar />
        <DynamicRouting />
      </Router>
    </div>
  );
}

export default App;
