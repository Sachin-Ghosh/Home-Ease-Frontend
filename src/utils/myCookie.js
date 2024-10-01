    // utils/auth.js
// import cookie from 'cookie';
import Cookies from "js-cookie";

// Function to set the authentication cookie
export const setCookie = (key, value, days=7) => {
    Cookies.set(key , value , { expires: days })
};

// Function to get the authentication token from the cookie
export const getCookie = (key) => {
    return Cookies.get(key) // => { name: 'value' }
};

// Function to remove the authentication cookie
export const removeCookie = (key) => {
    Cookies.remove(key);
};
