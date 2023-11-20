import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/shared/Layout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet/Wallet";
import Transactions from "./pages/Transactions";
import Login from "./AuthPages/Login";
import NotFound from "./AuthPages/NotFound";
import { dataContext } from "./ContexProvider/MyContext";
import Protector from "./AuthPages/Protector/Protector";
import SendToBenef from "./pages/Wallet/Modal/SendToBenef";
import SendToYourSelf from "./pages/Wallet/Modal/SendToYourSelf";
import AdminDash from "./Admin/AdminDash";
import UserTable from "./Admin/Children/UserTable";
import axios from "axios";
import { getAuthUserFromLocalStorage } from "./AuthPages/Data";

function App() {
  const {
    isLoggedIn,
    localRoutePrefix,
    access_token,
    setAccess_token,
    loginSignupToggle,
    currentUserData,
    role,
  } = useContext(dataContext);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Check if Current_UserId is not 0 (or any other default initial value)
  //   axios
  //     .get(`${localRoutePrefix}/auth/refresh`, {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setAccess_token(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching a user:", error);
  //     });
  // }, []);

  // Simulate loading delay
  useEffect(() => {
    if (currentUserData) {
      setTimeout(() => {
        setLoading(false); // Set loading to false after a delay (replace with actual data loading logic)
      }, 4000);
    } // Simulated 2 seconds of loading time
  }, []);

  if (loading) {
    // While loading, display a loading indicator
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="App  ">
      {!isLoggedIn ? ( // Check if the user is not logged in
        loginSignupToggle ? ( // Check if the user wants to sign up
          <Register />
        ) : (
          <Login />
        )
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={role === 1 ? <AdminDash /> : <Dashboard />} />

            <Route path="wallet" element={<Wallet />} />
            <Route path="users" element={<UserTable />} />

            <Route path="register" element={<Register />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
