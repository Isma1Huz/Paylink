import React, { useContext, useEffect, useState } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { FaUser, FaWallet } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { MdOutlineAttachMoney } from "react-icons/md";

import { dataContext } from "../../ContexProvider/MyContext";
import axios from "axios";

//number animation
function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

export default function AdminDashboardStatsGrid() {
  const {
    localRoutePrefix,
    hostedRoutPrefix,
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
    transactionData,
    setTransactionData, //getting data for admin t-table from t-fetch below
    access_token,
    refresh,
    setRefresh,
  } = useContext(dataContext);

  //------------------------A L L     U S E R S
  //------------------------A L L     U S E R S
  useEffect(() => {
    axios
      .get(`${localRoutePrefix}/users`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // console.log(" all-users----->", res.data);

        let active = 0;
        let inactive = 0;
        res.data.map((user) => {
          if (user.status === "Active") {
            active += 1;
          } else {
            inactive += 1;
          }
        });
        setActiveUsers(active);
        setInactiveUsers(inactive);
      })
      .catch((error) => {
        console.error("Error fetching a user:", error);
      });
  }, [refresh]);

  //------------------------A L L     W A L L E T S
  //------------------------A L L     W A L L E T S
  useEffect(() => {
    axios
      .get(`${localRoutePrefix}/wallet/all_wallet`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // console.log(" all-wallets----->", res.data);

        //-----------------------gets the most popular wallet
        const typeCount = {};
        for (const wallet of res.data) {
          const { type } = wallet;
          //   typeCount[totalBalance] += wallet.balance;
          if (typeCount[type]) {
            typeCount[type] += 1;
          } else {
            typeCount[type] = 1;
          }
        }

        // Find the type with the highest count
        let mostPopularType = null;
        let highestCount = 0;

        for (const type in typeCount) {
          if (typeCount[type] > highestCount) {
            mostPopularType = type;
            highestCount = typeCount[type];
          }
        }

        //---------------------------------------gets the total balance
        let total_Balance = 0;
        for (const wallet of res.data) {
          total_Balance += parseFloat(wallet.balance);
        }

        setTotalBalance(total_Balance);
        setWalletCount({ type: mostPopularType, count: highestCount });
      })
      .catch((error) => {
        console.error("Error fetching a user:", error);
      });
  }, []);
  //------------------------------------git all transactions
  useEffect(() => {
    fetch(`${localRoutePrefix}/transaction/all_transactions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((response) => {
        console.log("adminTransac---------", response); // Handle the successful response here
        setTransactionData(response);
        setTotalTransactions(response.length);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12   bg-indigo-500  p-4 flex items-center justify-between w-full ">
          <span className="text-xl text-white font-semibold">Total Users</span>
          <FaUser className="text-2xl text-white" />
        </div>
        <div className="  h-full w-full flex relative flex-row justify-between items-center">
          <div className=" w-1/2 m-2 flex flex-col p-3 justify-center items-center ">
            <h1 className="text-xl  text-green-500">Acitve</h1>
            <span className="text-2xl">{<Number n={activeUsers} />}</span>
          </div>
          <div className=" w-1/2 m-2 flex flex-col p-3 justify-center items-center ">
            <h1 className="text-xl  text-red-500">Inactive</h1>
            <span className="text-2xl">{<Number n={inactiveUsers} />}</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12   bg-indigo-500  p-4 flex items-center justify-between w-full">
          <span className="text-xl text-white font-semibold">
            Popular Wallet
          </span>
          <FaWallet className="text-2xl text-white" />
        </div>

        <div className="pl-4 mt-2  flex flex-col justify-center items-center gap-1">
          <strong className="text-3xl  text-gray-700 font-semibold">
            {walletCount.type}
          </strong>
          <h1 className="mt-4 text-3xl">{<Number n={walletCount.count} />}</h1>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12   bg-indigo-500  p-4 flex items-center justify-between w-full">
          <span className="text-xl text-white font-semibold">Total Money</span>
          <MdOutlineAttachMoney className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <div className="flex justify-center mt-10  items-center">
            <strong className="text-2xl text-gray-700 flex gap-2 font-semibold">
              $ {<Number n={totalBalance} />}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12   bg-indigo-500  p-4 flex items-center justify-between w-full">
          <span className="text-xl text-white font-semibold">
            Total transactions
          </span>
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4 flex items-center justify-center">
          <div className="flex items-cente mt-10">
            <strong className="text-2xl text-gray-700 font-semibold">
              {<Number n={totalTransactions} />}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className=" rounded-sm p-2 mb-3 flex-1 border relative border-gray-200 h-44  flex flex-col items-center">
      {children}
    </div>
  );
}
