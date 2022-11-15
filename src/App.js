import React, { Component, createContext, useState } from 'react';
import './App.css';
import Header from './Comonents/Header/Header';
import Shop from './Comonents/Shops/Shop';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";
import Review from './Comonents/Review/Review';
import Nomatch from './Comonents/No-match/Nomatch';
import Inventory from './Comonents/Cart/Inventory/Inventory';
import Productdetails from './Comonents/Product-details/Product-details';
import Shipment from './Comonents/Shipment/Shipment';
import Login from './Comonents/Login/Login';
import PrivateRoute from './Comonents/PrivetRout/PrivateRoute';

export const UserContext = createContext();


function App() {
  const [ loginUser, setLoginUser] = useState({})
  return (
    <UserContext.Provider value={[loginUser, setLoginUser]}>
        <h2>email: {loginUser.email}</h2>
       
      <div>
        <Router>
        <Header></Header>
          <Routes > 
            <Route path='/shop' element={<Shop/>} /> 
              {/* <Shop></Shop> */}
            
            <Route path='/review' element={<Review/>} /> 
            <Route path='/' element={<Shop/>} /> 
            {/* //Shipment */}
            <Route path="/shipment" element={<PrivateRoute />}>
              <Route  path="/shipment" element={ <Shipment />} />
            </Route>
            <Route path="/manage" element={<PrivateRoute />}>
              <Route path='/manage' element={ <Inventory /> }/>
            </Route>
            {/* //Login */}
            <Route path='/login' element={<Login /> }/>
            <Route path='/' element={<Shop/>} /> 
              {/* <Review></Review> */}
             
             
             <Route path='/product/:productId' element={<Productdetails/> }/>
             
             <Route path='/*' element={<Nomatch/>} /> 
           
          </Routes >
        </Router>
      </div>
      </UserContext.Provider>
  );
}

export default App;
