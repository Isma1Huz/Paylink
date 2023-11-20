// import React from 'react'

// function Setting() {
//   return (
//     <div>Setting</div>
//   )
// }

// export default Setting

import { jwtDecode } from "jwt-decode";

const AUTH_USER = "authUser";

const storeAuthUserOnLocalStorage = (authUser) => {
  localStorage.setItem(AUTH_USER, JSON.stringify(authUser));
};

const getAuthUserFromLocalStorage = () => {
  return localStorage.getItem(AUTH_USER);
};

const removeAuthUserFromLocalStorage = () => {
  return localStorage.removeItem(AUTH_USER);
};

const getHTTPHeaderWithToken = () => {
  return {
    headers: {
      Authorization: `Bearer ${getAuthUserFromLocalStorage()}`,
    },
  };
};

const checkJwtTokenIsExpired = () => {
  const token = getAuthUserFromLocalStorage();
  const decodedToken = jwtDecode(String(token));
  console.log(decodedToken);
  const currentDate = new Date();
  // JWT exp is in seconds
  return decodedToken.exp * 1000 < currentDate.getTime();
};

const getLoggedInUserDetails = () => {
  const token = getAuthUserFromLocalStorage();
  if (token) {
    const decoded = jwtDecode(getAuthUserFromLocalStorage());
    return decoded.sub;
  }
};

export {
  storeAuthUserOnLocalStorage,
  getAuthUserFromLocalStorage,
  removeAuthUserFromLocalStorage,
  getHTTPHeaderWithToken,
  getLoggedInUserDetails,
  checkJwtTokenIsExpired,
};

// getSendingDataSpinner,
// getLoadingDataSpinner,

// const getSendingDataSpinner = () => {
//     return (
//       <ColorRing
//         visible={true}
//         height="50"
//         width="50"
//         ariaLabel="blocks-loading"
//         wrapperStyle={{}}
//         wrapperClass="blocks-wrapper"
//         colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
//       />
//     );
//   };

//   const getLoadingDataSpinner = () => {
//     return (
//       <ColorRing
//         visible={true}
//         height="50"
//         width="50"
//         ariaLabel="blocks-loading"
//         wrapperStyle={{}}
//         wrapperClass="blocks-wrapper"
//         colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
//       />
//     );
//   };

// const token = getAuthUserFromLocalStorage();
// const decodedToken = jwtDecode(token);
// const currentDate = new Date();

// if (decodedToken.exp * 1000 < currentDate.getTime()) {
//   // Token has expired
//   console.error('Token has expired');
//   removeAuthUserFromLocalStorage();
//   return;
// }
