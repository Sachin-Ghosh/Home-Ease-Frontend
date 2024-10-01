
import { getCookie } from "./myCookie";

export async function myFetch(url = '', method = 'GET', formData = {}) {
    try {
        // Get the token from the cookie
        const token = getCookie("token");
        
        // Check if token is valid
        if (!token) {
            throw new Error('No token found');
        }

        // Set headers with the token
        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        // Ensure consistent method casing
        const uppercaseMethod = method.toUpperCase();

        let response;

        if (uppercaseMethod === 'GET') {
            response = await fetch(url, {
                method: uppercaseMethod,
                headers: headers,
            });
        } else {
            response = await fetch(url, {
                method: uppercaseMethod,
                headers: headers,
                body: JSON.stringify(formData),
            });
        }

        if (response.ok) {
            return await response.json();
        } else {
            // Check if the response is JSON
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                // If response is JSON, parse and throw error
                const error = await response.json();
                throw error;
            } else {
                // If response is not JSON, handle network error
                throw new Error('Network error occurred');
            }
        }
    } catch (error) {
        // Throw the error so that it can be caught by the calling function
        throw error;
    }
}
