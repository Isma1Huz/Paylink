import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { dataContext } from "../../../ContexProvider/MyContext";
import "./MinotTouches.css";

function SendToYourSelf() {
  //destructure the context
  const {
    access_token,
    setAllWallet,
    hostedRoutPrefix, //this one is helping solve the issue of the wallet stat balancing needing to be updated 3 time
  } = useContext(dataContext);
  const [isNewWalletModelOpen, setIsNewWalletModelOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  function sendMoney(data) {
    // console.log(Current_UserId);
    // console.log(data);
    setErrorMessage("");

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + access_token,

        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${hostedRoutPrefix}/wallet/move-movey`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(" response from server  was not ok");
        }
        return res.json();
      })
      .then((response) => {
        console.log(response); // Handle the successful response here
        if ("error" in response) {
          setErrorMessage(response.error);
        } else {
          setAllWallet(response);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // setError(e)
      });
  }
  const openNewWalletModel = () => {
    setIsNewWalletModelOpen(true);
  };

  const closeNewWalletModel = () => {
    setIsNewWalletModelOpen(false);
  };
  return (
    <div className="w-full h-96 flex  flex-col justify-center ">
      <form
        className="space-y-4 md:space-y-6 w-[100%] flex flex-col justify-center items-center"
        action="#"
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2       ">
          <div>
            <label
              htmlFor="countries"
              className="flex font-semibold mb-2 text-sm   text-gray-900 dark:text-white"
            >
              from_wallet
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-indigo-500 text-gray-900 smtext-lg rounded-xl focus:ring-indigo-400 focus:border-indigo-500 block w-[80%] p-3 placeholder-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="wallet_type"
              {...register("from_wallet")}
            >
              <option value="Savings">Savings</option>
              <option value="Invesment">Invesment</option>
              <option value="Emergencies">Emergencies</option>
              <option value="Main">Main</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="countries"
              className=" mb-2 flex justify-start  font-semibold  text-gray-900 dark:text-white"
            >
              to_wallet
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-indigo-500 text-gray-900 sm:text-lg rounded-xl focus:ring-indigo-400 focus:border-indigo-500 block w-[80%] p-3 placeholder-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="wallet_type"
              {...register("to_wallet")}
            >
              <option value="Main">Main</option>
              <option value="Emergencies">Emergencies</option>
              <option value="Savings">Savings</option>
              <option value="Invesment">Invesment</option>
            </select>
          </div>
        </div>

        <div
          className="flex flex-row w-full
        "
        >
          <div className=" flex flex-col justify-center items-center w-full">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter amount you wish to move
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Amount"
              {...register("amount", {
                required: true,
                maxLength: 20,
              })}
            />

            {errors.amount && (
              <p style={{ color: "red" }}>
                <small>Amount is required</small>
              </p>
            )}
            {errors.amount?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Should have a maximum of 20 characters</small>
              </p>
            )}
          </div>
        </div>
      </form>

      <p className="text-red-500 text-xl">{errorMessage}</p>

      <button
        type="button"
        class="text-white font-bold text-xl bg-indigo-500  py-2 mt-5 rounded-lg text"
        onClick={handleSubmit(sendMoney)}
      >
        Send
      </button>
    </div>
  );
}

export default SendToYourSelf;

{
  /* <select */
}
// name="category"
// id="dropdown"
// className="rounded-md p-4 outline-none"
// onChange={handleChosenCategory}
// // value={category}
// >
// <option value="all" defaultValue={"all"}>
//   All
// </option>
// {categories.map((item) => (
//   <option key={item.id}>{item.category_name}</option>
// ))}
// </select>
