import React, { useState, useEffect, useContext } from "react";
import { dataContext } from "../../ContexProvider/MyContext";

function UserTable() {
  const {
    localRoutePrefix,
    hostedRoutPrefix,
    refresh,
    setRefresh,
    activeUsers,
    setActiveUsers,
    inactiveUsers,
    setInactiveUsers,
    access_token,
  } = useContext(dataContext);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${hostedRoutPrefix}/users`);
      const json = await response.json();
      setData(json);
      // console.log(json);
    }
    fetchData();
  }, []);

  const handleUpdateProfile = async (id) => {
    console.log(id);

    setRefresh(!refresh);
    const response = await fetch(`${localRoutePrefix}/user/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    console.log(res.status);
    // Update the user profile data in the state
    const updatedDataIndex = data.map((user) => {
      if (user.id === id) {
        user.status = res.status;
        return user;
      } else {
        return user;
      }
    });

    setData(updatedDataIndex);
    //-------------------
    // if (response.status === "Active") {
    //   setActiveUsers(activeUsers + 1);
    //   setInactiveUsers(inactiveUsers - 1);
    // } else {
    //   setActiveUsers(activeUsers - 1);
    //   setInactiveUsers(inactiveUsers + 1);
    // }
  };
  // console.log(data);

  let filteredData = data;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="relative overflow-auto p-3   mt-10 border shadow-md sm:rounded-lg">
      <table className="border-collapse  w-full">
        <thead>
          <tr>
            <th className="px-2 pb-1">Account</th>
            <th className="px-2 pb-1">Name</th>
            <th className="px-2 pb-1">Address</th>
            <th className="px-2 pb-1">Phone_No</th>
            <th className="px-2 pb-1">Status</th>
            <th className="px-2 pb-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-2 py-2 pb-4">{user.Account}</td>
              <td className="px-2 py-2 pb-4">
                {user.first_name} {user.last_name}
              </td>
              <td className="px-2 py-2 pb-4">{user.address}</td>
              <td className="px-2 py-2 pb-4">{user.phone_number}</td>
              <td
                className={`px-2 py-2 pb-4 flex justify-center items-center rounded ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-700 active-status"
                    : "bg-yellow-100 text-red-700 inactive-status"
                }`}
              >
                {user.status}
              </td>
              <td className="px-2 py-2 pb-4">
                {user.status === "Active" ? (
                  <button
                    onClick={() => handleUpdateProfile(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white flex justify-center items-center w-full font-bold py-1 px-2 rounded"
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateProfile(user.id)}
                    className="bg-green-500 hover:bg-green-700 text-white flex justify-center items-center w-full font-bold py-1 px-2 rounded"
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default UserTable;
