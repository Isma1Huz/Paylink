import React, { useContext, Fragment, useState, useEffect } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { dataContext } from "../../ContexProvider/MyContext";
import axios from "axios";
import { AiOutlineExclamation } from "react-icons/ai";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
  HiCheck,
} from "react-icons/hi";
import classNames from "classnames";

export default function DashboardStatsGrid() {
  const [updatedWallet, setUpdatedWallet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    currentUserData,
    Current_UserId,
    localRoutePrefix,
    hostedRoutPrefix,
    access_token,
    waletGridBalance,
    setWaletGridBalance,
    allWallet,
    setAllWallet,
    updatedUserBalance,
    setUpdatedUserBalance,
    refresh,
  } = useContext(dataContext);
  `-----------------declared the state here to wait for currenet data to be populated-----------------`;
  const [wallets, setWalltes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (replace with actual data loading logic)
    }, 4000); // Simulated 2 seconds of loading time
  }, []);
  /*----------------------- G E T        A L L    W A L L E T  ---------------------------- */
  useEffect(() => {
    axios
      .get(`${hostedRoutPrefix}/wallet/wallet`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(" all-wallet----->", res.data);
        const balance = res.data.find(
          (wallet) => wallet.type === "Main"
        ).balance;
        console.log(balance);
        // setUpdatedUserBalance(balance);
        setAllWallet(res.data);
      })
      .catch((error) => {
        console.error("Error fetching a user:", error);
      });
  }, []);

  if (loading) {
    if (!allWallet) {
      return (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      );
    }
    // While loading, display a loading indicator
  }
  //!--------------- update wallet status function---------------------
  function deactivateWallet(id) {
    // console.log(id);
    setErrorMessage("");

    axios
      .put(`${hostedRoutPrefix}/wallet/wallet/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // setCurrentUserCartItems(res.data);

        console.log("msg--->", res.data);
        if ("error" in res.data) {
          console.log(res.data);
          setErrorMessage(res.data.error);
        } else {
          setAllWallet(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching updating wallet:", error);
      });
  }

  //------------------------------
  //------------------------------
  //------------------------------
  // console.log(waletGridBalance);
  // console.log(allWallet);
  //------------------------------
  //------------------------------
  //------------------------------

  const wallet_grid = allWallet.map((wallet) => {
    return (
      <BoxWrapper>
        <Popover className="absolute  top-0 left-0 ">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <AiOutlineExclamation fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0  top-16 z-10  transform w-80">
                  <div className="bg-white  rounded-xl shadow-md ring-1 w-44 ring-black flex items-center justify-center ring-opacity-1  ">
                    <button
                      onClick={() => deactivateWallet(wallet.id)}
                      className={
                        "text-gray-00 w-full font-sm border rounded-xl p-1 "
                      }
                    >
                      {wallet.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    {/* ---------------------------------------------------------------------------------- */}

                    {/* ----------------------------------------------------------------------------- */}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <div
          className="rounded-full h-12 w-12 bg-indigo-200
		 flex items-center justify-center "
        >
          <IoBagHandle className="text-2xl " />
        </div>{" "}
        <div className=" flex flex-col gap-4 w-full justify-center items-center">
          <span className="text-lg text-gray-800  font-light">
            {wallet.type}
          </span>
          <div className="pl-4 w-full h-[100%]">
            <div className="flex justify-between items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                ${wallet.balance}
              </strong>
              {wallet.type === "Main" ? (
                <p className="text-red-500 text-xl flex justify-center ">
                  {errorMessage}
                </p>
              ) : null}
              <span
                className={`text-sm ${
                  wallet.status === "Active" ? "text-green-500" : "text-red-500"
                }  pl-2`}
              >
                {wallet.status}
              </span>
            </div>
          </div>
        </div>
      </BoxWrapper>
    );
  });

  return (
    <div className="flex gap-4">
      {currentUserData ? wallet_grid : "Loading"}
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="shadow-sm  rounded-sm p-4 mb-4 flex-1 border  border-gray-200  flex items-center relative">
      {children}
    </div>
  );
}
