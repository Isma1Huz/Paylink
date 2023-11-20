import React from "react";
import DashboardStatsGrid from "../components/shared/UserDashboardStatsGrid";
import AnalyticBarChart from "../components/AnalyticBarChart";
import Transactions from "../components/Transactions";
import SentReceivedPieChart from "../components/SentReceivedPieChart";
import PopularProducts from "../components/PopularProducts";
import WalletActivity from "../components/WalletActivity";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 w-full">
        <AnalyticBarChart />
        <SentReceivedPieChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <WalletActivity />
        {/* <Transactions /> */}
        <PopularProducts />
      </div>
    </div>
  );
}
