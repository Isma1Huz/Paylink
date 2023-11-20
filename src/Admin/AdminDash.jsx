import React from "react";
import TransactionChart from "./Children/TransactionChart";
import GenderPie from "./Children/GenderPie";
import TransactionTable from "./Children/TransactionTable.jsx";

function AdminDash() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <GenderPie />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <TransactionTable />
      </div>
    </div>
  );
}

export default AdminDash;
