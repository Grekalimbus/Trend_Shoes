import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import localStorageService, {
    setTokens
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

export const loadUser = () => async (dispatch) => {
    dispatch(userRequested());
    try {
        const data = await userService.getCurrentUser();
        dispatch(userReceved(data));
    } catch (error) {
        dispatch(userRequestFiled(error.message));
    }
};

export const loginIn = (dataForm) => async (dispatch) => {
    const key = "AIzaSyCypYdSOsrKE2MT68JMCTLT9XKPESR35xU";
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

export const getUser = () => (state) => state.user.entities;

export default userReducer;
