import React from "react";
import PayModal from "../Modal/PayModal";
import CreditCard from "./CreditCard";
import Analytics from "../Analytics";

function CreditInfo() {
  return (
    <div class="w-full h-[400px] px-6   relative border border-gray-200 rounded-lg   ">
      <CreditCard />
      <PayModal />
      <Analytics />
    </div>
  );
}

export default CreditInfo;
