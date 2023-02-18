import axios from "axios";
import localStorageService, {
    setTokens,
    getRefreshToken
} from "./localStorage.service";
import config from "../../config.json";

const key = "AIzaSyCypYdSOsrKE2MT68JMCTLT9XKPESR35xU";

const authServices = {
    loginIn: async ({ email, password }) => {
        // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
        const url = config.api + "auth/signInWithPassword";

        const { data } = await axios.post(url, {
            email,
            password,
            returnSecureToken: true
        });
        setTokens({ ...data });
        return data;
    },
    signUp: async ({ email, password }) => {
        // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        const url = config.api + "auth/signUp";
        const { data } = await axios.post(url, {
            email,
            password,
            returnSecureToken: true
        });
        setTokens({ ...data, balance: 10000 });
        return data;
    },
    refreshToken: async () => {
        // const url = "https://securetoken.googleapis.com/v1/token?key=";
        const url = config.api + "auth/token";
        const refreshToken = getRefreshToken();
        const { data } = await axios.post(url, {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        });
        localStorageService.setTokens({
            refreshToken: data.refresh_token,
            idToken: data.id_token,
            localId: data.user_id,
            expiresIn: data.expires_in
        });
        return data;
    }
};

export default authServices;
