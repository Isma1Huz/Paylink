import React, { useContext } from "react";
import "./CreditStyle.css";
import visa from "./images/visa.png";
import chip from "./images/chip.jpg";
import { dataContext } from "../../../ContexProvider/MyContext";

function CreditCard() {
  const { currentUserData } = useContext(dataContext);
  return (
    <div className="card-group  relative    ">
      <div class="circles ">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
      <div className="card rounded-lg  ">
        <div className="logo">
          <img src={visa} alt="Visa" />
        </div>
        <div className="chip">
          <img src={chip} alt="chip" />
        </div>
        <div className="number text-xl mt-2">{currentUserData.Account}</div>
        <div className="name text-lg">{currentUserData.first_name}</div>
        <div className="from text-xl">10/19</div>
        <div className="to text-xl">06/21</div>
        <div class="ring"></div>
      </div>
    </div>
  );
}

export default CreditCard;
