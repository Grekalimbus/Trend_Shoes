import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import localStorageService, {
    setTokens,
    getTokenExpiresDate,
    getRefreshToken
} from "../services/localStorage.service";
import userService from "../services/user.service";

const userSlice = createSlice({
    name: "user",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        userRequested(state) {
            state.isLoading = true;
        },
        userReceved(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
        },
        userRequestFiled(state, actions) {
            state.error = actions.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: userReducer, actions } = userSlice;
const { userRequested, userReceved, userRequestFiled } = actions;

// получения юзера из бд и обновления состояния юзера state.user.entities = {мыло, id, balance}
export const loadUser = () => async (dispatch) => {
    dispatch(userRequested());
    try {
        const data = await userService.getCurrentUser();
        dispatch(userReceved(data));
    } catch (error) {
        dispatch(userRequestFiled(error.message));
    }
};

const key = "AIzaSyCypYdSOsrKE2MT68JMCTLT9XKPESR35xU";
export const loginIn = (dataForm) => async (dispatch) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    dispatch(userRequested());
    const { email, password } = dataForm;
    try {
        const { data } = await axios.post(url, {
            email,
            password,
            returnSecureToken: true
        });
        setTokens({ ...data });
        dispatch(loadUser());
        location.reload();
    } catch (error) {
        dispatch(userRequestFiled(error.message));
    }
};
// ===========
const createUser = (dataUserKey) => (dispatch) => {
    try {
        const data = userService.create(dataUserKey);
        dispatch(loadUser());
        console.log(data);
        console.log(dataUserKey);
        location.reload();
    } catch (error) {
        dispatch(userRequestFiled(error.message));
    }
};

export const signUp = (dataUserKey) => async (dispatch) => {
    const { email, password } = dataUserKey;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    try {
        const { data } = await axios.post(url, {
            email,
            password,
            returnSecureToken: true
        });
        setTokens({ ...data, balance: 10000 });
        dispatch(createUser({ ...data, balance: 10000 }));
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            if (message === "EMAIL_EXISTS") {
                const errorObject = {
                    email: "Пользователь с таким email уже зарегестрирован"
                };
                dispatch(userRequestFiled(errorObject));
                console.log(error);
                throw errorObject;
            }
        }
    }
};

export const refreshTokenChek = async () => {
    const url = "https://securetoken.googleapis.com/v1/token?key=";
    const expiresDate = getTokenExpiresDate();
    const refreshToken = getRefreshToken();
    if (refreshToken && expiresDate < Date.now()) {
        try {
            const { data } = await axios.post(url + key, {
                grant_type: "refresh_token",
                refresh_token: refreshToken
            });
            localStorageService.setTokens({
                refreshToken: data.refresh_token,
                idToken: data.id_token,
                localId: data.user_id,
                expiresIn: data.expires_in
            });
        } catch (error) {
            console.log(error);
        }
    }
};
// ==========

export const getUser = () => (state) => state.user.entities;
export const getErrorPassword = () => (state) => state.user.error;

export default userReducer;
