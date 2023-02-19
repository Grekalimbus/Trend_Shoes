import axios from "axios";
import localStorageService, {
    setTokens,
    getRefreshToken
} from "./localStorage.service";
import config from "../../config.json";

const httpAuth = axios.create({
    baseURL: config.api + "auth/"
});
const authServices = {
    loginIn: async ({ email, password }) => {
        const { data } = await httpAuth.post("signInWithPassword", {
            email,
            password,
            returnSecureToken: true
        });
        setTokens({ ...data });
        return data;
    },
    signUp: async ({ email, password }) => {
        const { data } = await httpAuth.post("signUp", {
            email,
            password,
            returnSecureToken: true
        });
        setTokens({ ...data });
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
