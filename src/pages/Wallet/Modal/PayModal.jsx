import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./MinotTouches.css";

//get the user id from the contetxProvider
import { useContext } from "react";
import { dataContext } from "../../../ContexProvider/MyContext";
import SendToBenef from "./SendToBenef";
import SendToYourSelf from "./SendToYourSelf";

function PayModal() {
  
  //destructure the context
  const { Current_UserId, setRefresh } = useContext(dataContext);
  const [isModelOpen, setIsModelOpen] = useState(false);
  // console.log(localStorage.getItem("access_token"));
  const [hideShowForm, seHideShowForm] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  function handleHideShowForm() {
    console.log("Abdiwaud");
    seHideShowForm(true);
  }

  function handleHideShowFormSenToBenef() {
    console.log("Abdiwaud");
    seHideShowForm(false);
  }

  const openModel = () => {
    setIsModelOpen(true);
    console.log("open");
  };

  const closeModel = () => {
    setIsModelOpen(false);
  };

  return (
    <div className="  btn ">
      <button
        onClick={openModel}
        type="button"
        class=" btn text-indigo-500 font-bold text-xl bg-white  w-full border-gray-30  z-1 px-4 py-2 rounded-3xl "
        data-toggle="modal"
        data-target="#payment-modal"
      >
        send money
      </button>

      <div
        class={`modal  ${isModelOpen ? "open" : ""}  `}
        id="payment-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="  w-96  bg-yellow-400  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg "
          role="document"
        >
          <div class="modal-content flex justify-center items-center ">
            <div class="modal-header flex flex-col justify-center items-center w-[100%] relative">
              <h1 className="text-2xl font-bold mb-3">send maney to </h1>
              <div className="flex gap-4  w-64 h-10 items-center p-2 mt-10 justify-between ">
                <button
                  class="modal-title text-xl font-bold text-indigo-500 uppercase  border-b-8  mb-5 "
                  id="exampleModalCenterTitle"
                  onClick={handleHideShowFormSenToBenef}
                >
                  benef
                </button>
                <button
                  onClick={handleHideShowForm}
                  class="modal-title text-xl font-bold text-indigo-500 uppercase border-b-8 mb-5 "
                  id="exampleModalCenterTitle"
                >
                  your-self
                </button>
              </div>

              {hideShowForm ? (
                <SendToYourSelf />
              ) : (
                <SendToBenef  />
              )}

              <button
                type="button"
                className="close absolute top-3 right-2 text-red bg-indigo-800"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PayModal;

{
  /* <p className="text-red-500 text-xl">{errors.serverError?.message}</p> */
}
