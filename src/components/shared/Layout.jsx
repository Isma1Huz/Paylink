import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UserDashboardStatsGrid from "./UserDashboardStatsGrid";
import { dataContext } from "../../ContexProvider/MyContext";
import AdminDashboardStatsGrid from "../../Admin/Children/AdminDashboardStatsGrid";

export default function Layout() {
  const { role } = useContext(dataContext);
  return (
    <div>
      <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="flex-1 p-4 min-h-0 overflow-auto">
            {role === 1 ? (
              
              <AdminDashboardStatsGrid />
            ) : (
              <UserDashboardStatsGrid />
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
