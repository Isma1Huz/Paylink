import axios from 'axios';

const refreshAccessToken = async () => {
  // Get the refresh token from the cookie.
  const refreshToken = document.cookie.match(/refresh_token=([^;]+)/)[1];

  // Make a POST request to the refresh route.
  const response = await axios.post('/refresh', { refreshToken });

  // If the request is successful, update the access token in the cookie.
  if (response.status === 200) {
    document.cookie = `access_token=${response.data.access_token}; path=/`;
  } else {
    // Handle the error.
    console.log(response.data.error);
  }
};

// Call the refreshAccessToken function every 30 minutes.
setInterval(refreshAccessToken, 30 * 60 * 1000);
