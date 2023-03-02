import axios from "axios";
import localStorageService, {
    setTokens,
    getRefreshToken
} from "./localStorage.service";
import config from "../../config.json";
import { toast } from "react-toastify";

const httpAuth = axios.create({
    baseURL: config.api + "auth/"
});

const authServices = {
    loginIn: async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post("signInWithPassword", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens({ ...data });
            window.location.reload();
            return data;
        } catch (e) {
            console.log(e);
            if (e.response.data.error.message === "INVALID_PASSWORD") {
                return toast.error("Неверный пароль");
            }
            if (e.response.data.error.message === "EMAIL_NOT_FOUND") {
                return toast.error("Такого email не существует");
            }
        }
    },
    signUp: async ({ email, password }) => {
        const { data } = await httpAuth.post("signUp", {
            email,
            password,
            returnSecureToken: true
        });
        setTokens({ ...data });
        window.location.reload();
        return data;
    },
    refreshToken: async () => {
        const refreshToken = getRefreshToken();
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        });
        localStorageService.setTokens(data);
        return data;
    }
};

export default authServices;
