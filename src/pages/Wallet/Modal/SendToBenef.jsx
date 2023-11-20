import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { dataContext } from "../../../ContexProvider/MyContext";

function SendToBenef() {
  const [error, setError] = useState("");
  //total transaction is taking the info to admintrasaction stat
  const {
    refresh,
    setRefresh,
    totalTransactions,
    setTotalTransactions,
    access_token,
    setUpdatedUserBalance,
    setAllWallet,
    runPieChart, //a pichart dependency as soo as the button is hit
    setRunPieChart,
    hostedRoutPrefix,
  } = useContext(dataContext);
  const {
    register,
    watch,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  function sendMoney(data) {
    // console.log(data);
    // console.log(Current_UserId);
    //clear the error stat
    setError("");
    setRefresh(!refresh);
    setRunPieChart(!runPieChart);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${hostedRoutPrefix}/transaction/transactions`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          // Handle the error case and set the error message in the <p> tag
          return res.json().then((errorData) => {
            const errorMessage = errorData.msg;
            console.log("-----------", res);
            // setError(errorMessage);
          });
        }
        return res.json();
      })
      .then((response) => {
        // navigate("login");
        console.log(response);
        setError(response.error);
        setUpdatedUserBalance(response[0].balance);
        setAllWallet(response);

        setTotalTransactions(totalTransactions + 1);
        // setError(response.msg);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <form class="space-y-4 md:space-y-6 w-[80%] " action="#">
        <div className="">
          <label
            for="account"
            class="block mb-2 text-xl font-medium text-gray-900 "
          >
            account
          </label>
          <input
            type="number"
            name="account"
            id="account"
            className="bg-gray-50 border border-indigo-500 text-gray-900 sm:text-lg rounded-lg   focus:ring-indigo-400 focus:border-primary-600 block w-full p-2   placeholder-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="account"
            {...register("account", {
              required: true,
              maxLength: 20,
            })}
          />

          {errors.account && (
            <p style={{ color: "red" }}>
              {" "}
              <small>account is required</small>{" "}
            </p>
          )}
          {errors.account?.type === "maxLength" && (
            <p style={{ color: "red" }}>
              {" "}
              <small>should have max 25 characters</small>{" "}
            </p>
          )}
        </div>

        <div>
          <label
            for="confirm-amount"
            class="block mb-2 text-xl font-medium text-gray-900 "
          >
            amount
          </label>
          <input
            type="number"
            {...register("amount", { required: true, minLength: 2 })}
            className="bg-gray-50 border border-indigo-500 text-gray-900 sm:text-lg rounded-lg   focus:ring-indigo-400 focus:border-primary-600 block w-full p-2   placeholder-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="amount"
          />
          {errors.amount && (
            <p style={{ color: "red" }}>
              <small>amount is required</small>
            </p>
          )}
          {errors.amount?.type === "minLength" && (
            <p style={{ color: "red" }}>
              {" "}
              <small>should have min 2 characters</small>{" "}
            </p>
          )}
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
            className="bg-gray-50 border border-indigo-500 text-gray-900 sm:text-lg rounded-lg   mb-3 focus:ring-indigo-400 focus:border-primary-600 block w-full p-2   placeholder-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="wallet_type"
            {...register("category")}
          >
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Investment">Investment</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
      </form>
      <p className="text-red-500 text-xl">{error}</p>

      <button
        type="button"
        class="text-white font-bold text-xl bg-indigo-500 w-48 px-7 mt-2 py-2 rounded-lg text"
        onClick={handleSubmit(sendMoney)}
      >
        Send
      </button>
    </div>
  );
}

export default SendToBenef;
