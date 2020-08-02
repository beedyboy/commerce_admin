import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'; 


// import {
//   Dashboard as DashboardView,
//   Modules as ModuleView,
// //   UserList as UserListView,
// //   Typography as TypographyView,
// //   Icons as IconsView,
// //   Account as AccountView,
// //   Settings as SettingsView,
// //   SignUp as SignUpView,
//   SignIn as SignInView,
//   NotFound as NotFoundView
// } from './pages';
import PrivateRoute from './PrivateRoute'; 
import UserProfile from '../views/UserProfile';
import MainLayout from '../layouts/Main/Main';
import Dashboard from '../views/Dashboard'; 
import Category from '../views/Category/Category';
import RoleList from '../views/Roles/RoleList';
import StaffList from '../views/Staff/StaffList';
import SignIn from '../views/SIgnIn/SignIn';
// import Members from '../views/Membership';
import Product from '../views/Products/Product';
import Pages from '../views/CMS/Pages/Pages';
import CompanyProfile from '../views/Company/CompanyProfile';
import Buyers from '../views/Membership/Buyers';
import Sellers from '../views/Membership/Sellers';

const Lanes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <PrivateRoute
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
     <PrivateRoute
        component={UserProfile}
        exact
        layout={MainLayout}
        path="/user-profile" 
      />
      
      
    <PrivateRoute
        component={Pages}
        exact
        layout={MainLayout}
        path="/pages"
      /> 
    <PrivateRoute
        component={Product}
        exact
        layout={MainLayout}
        path="/products"
      />
       <PrivateRoute
        component={Category}
        exact
        layout={MainLayout}
        path="/category"
      />
     <PrivateRoute
        component={RoleList}
        exact
        layout={MainLayout}
        path="/roles"
      />
         <PrivateRoute
        component={StaffList}
        exact
        layout={MainLayout}
        path="/staff"
      />

  <PrivateRoute
          component={Buyers}
          exact
          layout={MainLayout}
          path="/buyers"
        />


<PrivateRoute
                component={Sellers}
                exact
                layout={MainLayout}
                path="/sellers"
              />
        <PrivateRoute
                component={CompanyProfile}
                exact
                layout={MainLayout}
                path="/company-profile"
              />
      {/* <PrivateRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
       */}
     <Route
        component={SignIn}
        exact 
        path="/sign-in"
      />
       {/* <NormalRoute
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      /> 
      <Redirect to="/not-found" /> */}
    </Switch>
  );
};

export default Lanes;
