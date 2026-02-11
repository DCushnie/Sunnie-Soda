import axios from "axios";



const apUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: apUrl,
    withCredentials: true,
});

export default api;