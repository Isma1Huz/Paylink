import classNames from "classnames";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { dataContext } from "../ContexProvider/MyContext";


function PopularProducts() {
  const { currentUserData } = useContext(dataContext);
  if (!currentUserData || currentUserData.length === 0) {
    // Render a loading indicator
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200 ">
      <strong className="text-gray-700   font-medium">Beneficiaries</strong>

      <div className="flex justify-around mt-6">
        <strong className="text-gray-700 font-medium">Name</strong>
        <strong className="text-gray-700 font-medium">Account</strong>
      </div>
      {currentUserData.beneficiaries.length !== 0 ? (
        <div className="mt-4 flex flex-col gap-3">
          {currentUserData.beneficiaries.map((ben) => (
            <Link
              to="/wallet"
              className="flex items-start hover:no-underline l"
            >
              <div className="ml-4 flex-1">
                <p className="text-lgm text-gray-800 ">{ben.name}</p>
              </div>
              <div className="text-sm text-gray-700 pl-1.5">{ben.Account}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-red-500 font-semibold text-xl flex justify-center items-center mt-10">
          {" "}
          NO beneficiaries Found
        </div>
      )}
    </div>
  );
}

export default PopularProducts;
