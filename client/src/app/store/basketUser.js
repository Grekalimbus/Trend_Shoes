import { createSlice } from "@reduxjs/toolkit";
import httpServices from "../services/http.service";
import localStorageService from "../services/localStorage.service";

const basketUser = createSlice({
    name: "basketUser",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFeatch: null
    },
    reducers: {
        basketUserRequested(state, actions) {
            state.isLoading = true;
        },
        basketUserReceved(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
            state.lastFeatch = Date.now();
        },
        basketUserFiled(state, actions) {
            state.error = actions.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: basketUserReducer, actions } = basketUser;
const { basketUserRequested, basketUserReceved, basketUserFiled } = actions;

const userID = localStorageService.getUserId();
export const loadBasketUser = () => async (dispatch, getState) => {
    dispatch(basketUserRequested());
    try {
        const { data } = await httpServices.get(`basket/${userID}`);
        dispatch(basketUserReceved(data[0].basket));
    } catch (error) {
        dispatch(basketUserFiled(error.message));
    }
};

export const getBasketUser = () => (state) => state.allBasket.entities;

export default basketUserReducer;
