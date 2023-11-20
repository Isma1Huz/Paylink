import React from "react";
import { HiArrowSmUp } from "react-icons/hi";
import { HiArrowDown } from "react-icons/hi";

function WalletActivityRecord({
  activity_id,
  activity_amount,
  activity_created_at,
  activity_description,
  activity_transaction_type,
}) {
  const typeColor =
    activity_transaction_type === "sent" ? "bg-red-200" : "bg-green-200";

  const arrows =
    activity_transaction_type === "sent" ? <HiArrowSmUp /> : <HiArrowDown />;
  const arrow_color =
    activity_transaction_type === "sent" ? "text-red-400" : "text-green-400";

  return (
    <>
      <td className="p-3 text-xl font-medium text-gray-900  ">
        <span className={`font-bold text-4xl  ${arrow_color}`} href="">
          {arrows}
        </span>
      </td>
      <td className="p-3 text-xl font-medium text-gray-900 ">{activity_description}</td>
      <td className="p-3 text-xl font-medium text-gray-900 whitespace-nowrap ">
        {" "}
        <span
          className={` p-2 text-xs  uppercase tracking-wider text-green-800  rounded-lg bg-opacity-70 ${typeColor}`}
        >
          {activity_transaction_type}
        </span>
      </td>
      <td className="p-3 text-xl font-medium text-gray-900  whitespace-nowrap">
        {activity_created_at}
      </td>
      <td className="p-3 text-xl font-medium text-gray-900  whitespace-nowrap">
        ${activity_amount}
      </td>
    </>
  );
}

export default WalletActivityRecord;
