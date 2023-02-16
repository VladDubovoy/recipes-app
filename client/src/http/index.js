import axios from 'axios';
import { toast } from "react-toastify";

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, (error) => {
    if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message ?? 'Request failed');
    }
    throw error;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    console.log(error)
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/refresh`, {
            withCredentials: true,
        });
        console.log(response)
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
    }
    throw error;
})

export default $api;