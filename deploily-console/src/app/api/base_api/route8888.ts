
import axios from 'axios';
import { getSession } from 'next-auth/react';

// Create an Axios instance with the base URL from environment variables
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,  // Base URL from .env file
    timeout: 10000,  // Optional: Set a timeout for the request
    headers: {
        'Content-Type': 'application/json',
    },
});


// Add a request interceptor to include the Authorization header if session exists
axiosInstance.interceptors.request.use(
    async (config) => {
        const session = await getSession();  // Get the session to access the access token

        // If the session exists and contains the access token, add it to the Authorization header
        if (session?.accessToken) {
            config.headers['Authorization'] = `Bearer ${session.accessToken}`;
        }

        return config;  // Return the updated config
    },
    (error) => {
        return Promise.reject(error);  // Handle any errors in the request
    }
);
// Generic API function to handle all HTTP methods dynamically
const apiCall = async (method: string, uri: string, body: any = null) => {
    try {
        // Set the config for the request
        const config = {
            method: method,  // HTTP method (GET, POST, PUT, DELETE, etc.)
            url: uri,        // The URI or endpoint
            data: body,   
            headers:{

            }
        };
        // Make the API call using the Axios instance
        const response = await axiosInstance(config);

        // Return the response data
        return response;
    } catch (error) {
        // If an error occurs, return the error message
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message || 'Unknown error');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export default apiCall;
