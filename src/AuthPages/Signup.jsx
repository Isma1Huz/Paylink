import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-web";
import signupBanner from "../../assets/signupBanner.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext } from "react";
import { dataContext } from "../ContexProvider/MyContext";

function Signup() {
  //----------C O N T E X T
  const { setIsLoggedIn, loginSignupToggle, setLoginSignupToggle } =
    useContext(dataContext);

  const navigate = useNavigate();

  const [animationLoaded, setAnimationLoaded] = useState(false);
  const container = useRef();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    AOS.init();
    const anim = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: signupBanner,
    });

    anim.addEventListener("DOMLoaded", () => {
      setAnimationLoaded(true);
    });

    return () => {
      // Clean up the animation when the component is no longer in the view
      anim.destroy();
    };
  }, []);

  function signUpUser(data) {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://127.0.0.1:5555/auth/signup", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((response) => {
        console.log(response); // Handle the successful response here
        // navigate("login");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  return (
    <section className="flex " data-aos="fade-up" data-aos-duration="500">
      <div className="flex  w-[100%] mr-10 items-center justify-center sm:flex sm:flex-col md:flex-col lg:flex-row px-6 py-8  ">
        <div
          className={`sm:h-screen border-b-0  ${
            animationLoaded ? "" : "hidden"
          }         
        

        `}
          ref={container}
        ></div>

        <div className="w-[40%] bg-white   rounded-lg shadow-slate-400 sm:mt-[-200px]  sm:z-10 lg:mt-0  sm:w-[80%] md:w-[80%] xl:w-[50%] dark:border-gray-800 md:p-3 p-3 shadow-lg">
          <div className="w-full ">
            <h1 className="flex justify-center mb-10 text-3xl font-bold">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6  w-full"
              action="#"
              onSubmit={handleSubmit(signUpUser)}
            >
              <div className=" grid grid-cols-2 gap-4">
                <div>
                  <label
                    for="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="first name"
                    {...register("first_name")}
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Last name"
                    {...register("last_name")}
                  />
                </div>

                <div>
                  <label
                    for="user_name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    username
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="user name"
                    {...register("user_name")}
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    {...register("email")}
                  />
                </div>
                <div>
                  <label
                    for="address"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="address"
                    {...register("address")}
                  />
                </div>
                <div>
                  <label
                    for="address"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="phone_number"
                    {...register("phone_number")}
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password")}
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("confirm_password")}
                  />
                </div>
              </div>

              <button className=" text-white border shadow  flex justify-center items-center mx-auto border-gray-300 bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Create an account
              </button>
              <p className="text-sm font-light   text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  onClick={() => setLoginSignupToggle(!loginSignupToggle)}
                  className="font-medium  text-primary-600 hover:underline dark:text-primary-500 text-indigo-800"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
