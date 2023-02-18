import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config.json";
import localStorageService from "../services/localStorage.service";
import authServices from "./auth.service";

const http = axios.create({
    baseURL: config.api
});
axios.defaults.baseURL = config.api;

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        const accessToken = localStorageService.getAccessToken();
        const isExpired = refreshToken && expiresDate < Date.now();

        if (isExpired) {
            const data = authServices.refreshToken();
            localStorageService.setTokens(data);
        }
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            };
        }
        return config;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response < 500;
        if (!expectedErrors) {
            if (error.message === "Network Error") {
                console.log(error);
            }
            if (
                error.message === "Request failed with status code 400" ||
                error.code === 400
            ) {
                toast.error("Пользователь с таким email уже зарегестрирован");
            } else {
                toast.warning(error.message);
            }
        }
        return Promise.reject(error);
    }
);

export default http;
