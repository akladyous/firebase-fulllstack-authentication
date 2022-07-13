import axios from "axios";
import { getCookie } from "../../util/getCookie.js";
const BASE_URL = "http://localhost:4000/api/";

export const apiClient = axios.create({
    headers: { "Content-Type": "application/json" },
    Accept: "application/json",
    baseURL: BASE_URL,
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    headers: { "Content-Type": "application/json" },
    Accept: "application/json",
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosPrivate.interceptors.request.use(async (config) => {
    // await apiClient.get('/csrf')
    const cookie = getCookie('XSRF-TOKEN');
    if (cookie) {
        config.headers = { 'XSRF-TOKEN': cookie };
        return config;
    } else {
        return Promise.reject('csrf cookie not found')
    }

}, (error) => {
    return Promise.reject(error)
})

export const httpClient = async () => {
    await apiClient.get('/csrf')
    const cookie = getCookie('XSRF-TOKEN');
    axiosPrivate.defaults.headers.common['XSRF-TOKEN'] = cookie

    return axiosPrivate;
}