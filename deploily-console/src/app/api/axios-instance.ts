import axios from 'axios';

// Create an Axios instance with the base URL from environment variables
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,  // Base URL from .env file
    timeout: 10000,  // Optional: Set a timeout for the request
});


// // Add a request interceptor to include the Authorization header if session exists
// axiosInstance.interceptors.request.use(
//     async (config) => {
//         const session = await getSession();  // Get the session to access the access token

//         // If the session exists and contains the access token, add it to the Authorization header
//         if (session?.accessToken) {
//             config.headers['Authorization'] = `Bearer ${session.accessToken}`;
//         }

//         return config;  // Return the updated config
//     },
//     (error) => {
//         return Promise.reject(error);  // Handle any errors in the request
//     }
// );

export default axiosInstance;
