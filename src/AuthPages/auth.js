import { createAuthProvider } from "react-token-auth";

export const { useAuth, authFetch, login, logout } = createAuthProvider({
  accessTokenKey: "access_token",
  onUpdateToken: (token) =>
    fetch("http://127.0.0.1:5555/auth/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.refresh_token}`, // Include the refresh token in the request headers
        "Content-Type": "application/json", // Set the content type as needed
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data.access);
      }),
});

// .then((data) => login(data)),
