/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Signin from "./usr/Signin";
import Signup from "./usr/Signup";
import Index from "./usr/Index";
import PrivateRoute from "../auth/PrivateRoute";
import AdminRoute from "../auth/PrivateRoute";
import Profile from "./usr/Profile";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
import Orders from "./order/Orders";
import CreateOrder from "./order/CreateOrder";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ForgotPassword from "./usr/ForgotPassword";
import ResetPassword from "./usr/ResetPassword";
import NotFoundPage from "./usr/NotFound";
import ServerError from "./usr/ServerError";
// components
import Sidebar from "../components/Sidebar";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { isAuthenticated } from '../auth';
import AdminSidebar from './admin/AdminSidebar';
import Products from './Products/Products';

const FrontEndRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => ( <> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  
  // const localStorageIsSettingsVisible = () => {
  //   return localStorage.getItem('settingsVisible') === 'false' ? false : true
  // }

  // const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  // const toggleSettings = () => {
  //   setShowSettings(!showSettings);
  //   localStorage.setItem('settingsVisible', !showSettings);
  // }

  function Dashboard(){
    const { user } = isAuthenticated();
    if(isAuthenticated() && user.role === 1){
      return <AdminSidebar/>
    } else {
      return <Sidebar/>
    }
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Dashboard />

        <main className="content">
          <NavBar />
          <Component {...props} />
          <Footer />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <BrowserRouter>
    <Switch>
      <FrontEndRoute exact path={Routes.Signin.path} component={Signin} />
      <FrontEndRoute exact path={Routes.Signup.path} component={Signup} />
      <FrontEndRoute exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
      <FrontEndRoute exact path={Routes.ResetPassword.path} component={ResetPassword} />
      <FrontEndRoute exact path={Routes.NotFound.path} component={NotFoundPage} />
      <FrontEndRoute exact path={Routes.ServerError.path} component={ServerError} />

      {/* pages */}
      <RouteWithSidebar exact path={Routes.Index.path} component={Index} />
      <PrivateRoute exact path={Routes.Profile.path} component={Profile} />
      <PrivateRoute exact path={Routes.Product.path} component={Products} />
      <AdminRoute exact path={Routes.AddCategory.path} component={AddCategory} />
      <AdminRoute exact path={Routes.AddProduct.path} component={AddProduct} />
      <PrivateRoute exact path={Routes.Wallet.path} component={Wallet} />
      <PrivateRoute exact path={Routes.Transactions.path} component={Transactions} />
      <PrivateRoute exact path={Routes.Orders.path} component={Orders} />
      <PrivateRoute exact path={Routes.CreateOrder.path} component={CreateOrder} />
      <Redirect to={Routes.NotFound.path} />
    </Switch>
  </BrowserRouter>
);
