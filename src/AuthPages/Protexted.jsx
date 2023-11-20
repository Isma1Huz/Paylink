import React from "react";
import { Navigate } from "react-router-dom";

function Protexted({ isLoggedin, children }) {
  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default Protexted;

// <div className="App flex  ">
// {isLoggedIn && <SideBar />}

// <Routes>
//   <Route
//     path="/"
//     element={
//       <Protexted isLoggedin={isLoggedIn}>
//         <Dashboard />
//       </Protexted>
//     }
//   />
//   <Route
//     path="wallet"
//     element={
//       <Protexted isLoggedin={isLoggedIn}>
//         <Wallet />
//       </Protexted>
//     }
//   />
//   <Route
//     path="transactions"
//     element={
//       <Protexted isLoggedin={isLoggedIn}>
//         <Transactions />
//       </Protexted>
//     }
//   />
//   <Route
//     path="help"
//     element={
//       <Protexted isLoggedin={isLoggedIn}>
//         <Help />
//       </Protexted>
//     }
//   />
//   <Route
//     path="account"
//     element={
//       <Protexted isLoggedin={isLoggedIn}>
//         <Account />
//       </Protexted>
//     }
//   />
//   <Route path="login" element={<Login />} />
//   <Route path="signup" element={<Signup />} />
// </Routes>
// </div>
