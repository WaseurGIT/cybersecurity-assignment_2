// import axios from "axios";

// const axiosSecure = axios.create({
//     baseURL: "http://localhost:5000",
//     withCredentials: true,
// })

// axiosSecure.interceptors.request.use(config=>{
//     // const token = localStorage.getItem("access-token");
//     if(token){
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// })

// export default axiosSecure;

import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://cybersecurity-assignment-2-server.onrender.com",
  withCredentials: true, // CRITICAL: This sends the cookie to the server
});

export default axiosSecure;