import axios from "axios";



const apUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: apUrl,
    withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, // normal responses pass through
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("You are not authorised. Please log in.");

      // ToDo:
      // redirect to login page
      // window.location.href = "/login";

      // clear local state if needed
    }

    return Promise.reject(error); //tells my frontend that things failed
  }
);

export default api;