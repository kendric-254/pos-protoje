import React from "react"; 
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SideBar from "./components/sideBar";
import DisplaySales from "./components/DisplaySales";
import { AuthProvider, useAuth } from "./components/AuthContext";
import DataPage from "./components/DataPage";
import DeleteProduct from "./components/DeleteProduct";
import LoginAdminForm from "./components/loginAdminForm";
import RegistrationForm from "./components/RegistrationForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import UserRegestrationForm from "./components/UserRegestrationForm";
import LoginUserForm from "./components/loginUserForm";
import ForgotPassword from "./components/ForgotPassword";
import EditProduct from "./components/EditProduct";
import ProductShop from "./components/ProductShop";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <ToastContainer />
    </AuthProvider>
  );
}

function AppContent() {
  const { isLoggedIn, userRole } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/loginAdmin">
          <LoginAdminForm />
        </Route>
        <Route path="/registerForm">
          <RegistrationForm />
        </Route>
        <Route path="/loginUser">
          <LoginUserForm />
        </Route>
        <Route path="/userRegestration">
          <UserRegestrationForm />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/resetPassword">
          <ResetPasswordForm />
        </Route>
        <Route path="/">
          {isLoggedIn ? (
            userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          ) : (
            <Redirect to="/loginAdmin" />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function AdminDashboard() {
  return (
    <div>
      <SideBar />
      <div className="flex-grow ml-0 lg:ml-60 bg-blue-gray-900">
        <Navbar />
        <Switch>
          <Route exact path="/dashboard">
            <HomePage />
          </Route>
          <Route path="/sales">
            <DisplaySales />
          </Route>
          <Route path="/editProduct/:id">
            <EditProduct />
          </Route>
          <Route path="/deleteProduct/:id">
            <DeleteProduct />
          </Route>
          <Route path="/dataPage">
            <DataPage />
          </Route>
          <Route path="/productShop">
            <ProductShop />
          </Route>
          <Redirect to="/dashboard" />
        </Switch>
      </div>
    </div>
  );
}

function UserDashboard() {
  return (
    <div>
      <SideBar />
      <div className="flex-grow ml-0 lg:ml-60 bg-blue-gray-900">
        <Navbar />
        <Switch>
          <Route exact path="/dashboard">
            <HomePage /> {/* Ensure this points to the correct component */}
          </Route>
          <Route path="/sales">
            <DisplaySales />
          </Route>
          <Route path="/productShop">
            <ProductShop />
          </Route>
          {/* Add any other user-specific routes here if needed */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
