import React, { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Dna } from "react-loader-spinner";

const dataContext = createContext();

function MyContext({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginSignupToggle, setLoginSignupToggle] = useState(false);

  /**---------------------------------------------------------   T O K E N---------------------- */
  // const access_token = localStorage.getItem("access_token");
  // console.log(access_token);

  /**---------------  F O R     U S E R ---------------------- */
  // const Current_UserName = localStorage.getItem("user_name");
  // const Current_UserRole = localStorage.getItem("user_role");
  // const Current_UserId = localStorage.getItem("user_id");
  // const Current_UserProfilePicture = localStorage.getItem("user_profile_pic");
  // const Current_UserAccount_number = localStorage.getItem("account_number");
  const localRoutePrefix = "http://127.0.0.1:5555";
  const hostedRoutPrefix = "https://paylink-v83s.onrender.com";

  /**---------------  F O R    A P P       S T A T E S ---------------------- */
  const [Current_UserId, setCurrent_UserId] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [waletGridBalance, setWaletGridBalance] = useState(0);
  const [allWallet, setAllWallet] = useState([]);
  const [updatedUserBalance, setUpdatedUserBalance] = useState(0); // it is for the main balance in wallet and is from main stat card
  const [runPieChart, setRunPieChart] = useState(false); // it is for the main balance in wallet and is from main stat card
  const [walletActivityData, setWalletActivityData] = useState([]);

  const [role, setRole] = useState("");

  // for usertable activ/inac and admin user statscard
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [walletCount, setWalletCount] = useState({});
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [access_token, setAccess_token] = useState("");

  //
  //
  const [loading, setLoading] = useState(true);
  //
  useEffect(() => {
    setIsLoggedIn(true); // Simulated 2 seconds of loading time
    setRefresh(!refresh);
  }, []);
  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (replace with actual data loading logic)
    }, 4000); // Simulated 2 seconds of loading time
  }, []);
  /*----------------------- G E T        A L L    U S E R S ---------------------------- */
  useEffect(() => {
    // Check if Current_UserId is not 0 (or any other default initial value)
    axios
      .get(`${localRoutePrefix}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(" user----->", res.data);
        setCurrentUserData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching a user:", error);
      });
  }, [refresh]);

  useEffect(() => {
    axios
      .get(`${localRoutePrefix}/wallet/wallet-Activity`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setWalletActivityData(response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [refresh]);

  const values = {
    isLoggedIn,
    setIsLoggedIn,
    loginSignupToggle,
    setLoginSignupToggle,
    // Current_UserName,
    // Current_UserRole,
    Current_UserId,
    setCurrent_UserId,
    // Current_UserProfilePicture,
    // Current_UserAccount_number,
    access_token,
    setAccess_token,
    localRoutePrefix,
    hostedRoutPrefix,
    refresh,
    setRefresh,
    currentUserData,
    setCurrentUserData,
    waletGridBalance,
    setWaletGridBalance,
    walletActivityData,
    setWalletActivityData,
    role,
    setRole,
    allWallet, //for the user wallet stat cards
    setAllWallet,
    updatedUserBalance, //for  wallet page balance
    setUpdatedUserBalance,
    // for admin-dashboard stats
    activeUsers,
    setActiveUsers,
    inactiveUsers,
    setInactiveUsers,
    walletCount,
    setWalletCount,
    totalBalance,
    setTotalBalance,
    totalTransactions,
    setTotalTransactions,
    //for the barchart
    runPieChart,
    setRunPieChart,
    transactionData, // its is needed in the admin t-table and is getting data from t-fetch in admin stats
    setTransactionData,
  };
  // console.log(transactionData);
  return <dataContext.Provider value={values}>{children}</dataContext.Provider>;
}

export default MyContext;
export { dataContext };
