import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute =({}) =>{
    const [loginUser, setLoginUser] = useContext(UserContext)
    const location = useLocation();
    console.log(loginUser.email)
    console.log({loginUser})
    return loginUser.email ? <Outlet /> : <Navigate to="/login" replace state={{from: location}} />;
  }

export default PrivateRoute;