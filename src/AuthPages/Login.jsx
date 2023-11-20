import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { dataContext } from "../ContexProvider/MyContext";
import { login } from "./auth";
import loginSVG from "../assets/loginSVG.json";
import "aos/dist/aos.css";
import AOS from "aos";
import Lottie from "lottie-web";
import { storeAuthUserOnLocalStorage } from "./Data";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  //instanticate the navigate method
  const navigate = useNavigate();
  // const navigate = useNavigate();
  //destructure the contex
  const {
    loginSignupToggle,
    setIsLoggedIn,
    setLoginSignupToggle,
    setRole,
    setRefresh,
    setCurrent_UserId,
    setAccess_token,
    localRoutePrefix,
    hostedRoutPrefix,
  } = useContext(dataContext);
  //boolean state to stop the SVG from rendering multiple times
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const container = useRef();

  //for animating the SVG
  useEffect(() => {
    AOS.init();
    const anim = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loginSVG,
    });

    anim.addEventListener("DOMLoaded", () => {
      setAnimationLoaded(true);
    });

    return () => {
      // Clean up the animation when the component is no longer in the view
      anim.destroy();
    };
  }, []);

  //form hook methods
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle sumbit function for the login form
  function loginUser(data) {
    // console.log(data);
    setErrorMessage("");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${localRoutePrefix}/auth/login`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if ("error" in data) {
          setErrorMessage(data.error);
        } else {
          data.access_token && navigate("/");
          data.access_token ? setIsLoggedIn(true) : setIsLoggedIn(false);
          setRole(data.user_role);
          setCurrent_UserId(data.user_id);
          console.log(data.user_id);
          setAccess_token(data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          localStorage.setItem("user_name", data.user_name);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("user_role", data.user_role);
          localStorage.setItem("user_profile_pic", data.user_profile_pic);
          localStorage.setItem("account_number", data.account_number);
          localStorage.setItem("access_token", data.access_token);
          setRefresh(!true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <section
      class="bg-transparent  "
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div class="flex flex-row sm:flex sm:flex-col  sm:justify-cente sm:iter lg:flex-row  sm-h-screen  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div
          className={` sm:h-screen sm:mt-[-100px]  lg:mt-0 ${
            animationLoaded ? "" : "hidden"
          }         
        

        `}
          ref={container}
        ></div>
        <div class="   sm:w-[60%]  xl:w-[30%]  sm:mt-[-400px] lg:mr-[300px] sm:z-10  lg:mt-0 bg-white rounded-lg   dark:border   xl:p-0  dark:border-gray-100 shadow-gray-400  shadow-lg">
          <div class="p-6 space-y-4 md:space-y-10 sm:p-8 ">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-indigo-700 md:text-2xl flex justify-center">
              Login
            </h1>
            <form class="space-y-4 md:space-y-6 " action="#">
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  username
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="user name"
                  {...register("user_name", {
                    required: true,
                    maxLength: 20,
                  })}
                />

                {errors.user_name && (
                  <p style={{ color: "red" }}>
                    {" "}
                    <small>user_name is required</small>{" "}
                  </p>
                )}
                {errors.user_name?.type === "maxLength" && (
                  <p style={{ color: "red" }}>
                    {" "}
                    <small>should have max 25 characters</small>{" "}
                  </p>
                )}
              </div>

              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 2 })}
                  className="bg-gray-50 border border-indigo-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="password"
                />
                {errors.password && (
                  <p style={{ color: "red" }}>
                    <small>password is required</small>
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p style={{ color: "red" }}>
                    {" "}
                    <small>should have min 2 characters</small>{" "}
                  </p>
                )}
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-500 ">
                    I accept the{" "}
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <p className="text-red-500 text-xl flex justify-center ">
                {errorMessage}
              </p>

              <button
                onClick={handleSubmit(loginUser)}
                className=" text-white border shadow  flex justify-center items-center mx-auto border-gray-300 bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p class="text-sm font-light  text-gray-500 dark:text-gray-400">
                Do not have an account?{" "}
                <Link
                  to="/register"
                  onClick={() => setLoginSignupToggle(!loginSignupToggle)}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-indigo-800"
                >
                  Signup here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
