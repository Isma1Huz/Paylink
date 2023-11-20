import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { dataContext } from "../../ContexProvider/MyContext";

export default function TransactionTable() {
  const { currentUserData, transactionData, setTransactionData } =
    useContext(dataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;

  const [loading, setLoading] = useState(true);
  // Simulate loading delay
  // useEffect(() => {
  //   if (currentUserData) {
  //     setTimeout(() => {
  //       setLoading(false); // Set loading to false after a delay (replace with actual data loading logic)
  //     }, 5000);
  //   } // Simulated 2 seconds of loading time
  // }, []);

  if (!currentUserData || currentUserData.length === 0) {
    // While loading, display a loading indicator
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }
  let filteredData = transactionData;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const currentEntries = transactionData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  return (
    <div className="bg-white  pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Transaction</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        {currentEntries.length !== 0 ? (
          <table className="w-full text-gray-700  ">
            <thead className="border   ">
              <tr className="">
                <th className="  p-1 text-center"> ID</th>
                <th className="  p-1 text-center">SName</th>
                <th className="  p-1 text-center">RName</th>
                <th className="  p-1 text-center">type</th>
                <th className="  p-1 text-center">Amnt</th>
                <th className="  p-1 text-center">chanrges</th>
                <th className="  p-1 text-center">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y  ">
              {currentEntries.map((order) => (
                <tr key={order.id}>
                  <td className=" text-sm p-2 text-center">
                    {order.transaction_id}
                  </td>
                  <td className=" text-sm p-2 text-center">
                    {order.sender_name}
                  </td>
                  <td className=" text-sm p-2 text-center">
                    {order.receiver_name}
                  </td>
                  <td className=" text-sm p-2 text-center">
                    {format(new Date(order.created), "dd MMM yyyy")}
                  </td>
                  <td className=" text-sm p-2 text-center">{order.amount}</td>
                  <td className=" text-sm p-2 text-center">
                    {order.transaction_fee}
                  </td>
                  <td className=" text-sm p-2 text-center">{order.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-red-500 font-semibold text-3xl text-center">
            No transactions
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredData.length / entriesPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-2 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}



