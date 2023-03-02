import { createSlice } from "@reduxjs/toolkit";
import httpServices from "../services/http.service";

const allBasket = createSlice({
    name: "allBasket",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFeatch: null
    },
    reducers: {
        allBasketRequested(state, actions) {
            state.isLoading = true;
        },
        allBasketReceved(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
            state.lastFeatch = Date.now();
        },
        allBasketFiled(state, actions) {
            state.error = actions.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: allBasketReducer, actions } = allBasket;
const { allBasketRequested, allBasketReceved, allBasketFiled } = actions;

export const loadAllBasket = () => async (dispatch, getState) => {
    dispatch(allBasketRequested());
    try {
        const { data } = await httpServices.get(`basket`);
        dispatch(allBasketReceved(data));
    } catch (error) {
        dispatch(allBasketFiled(error.message));
    }
};

export const getAllBasket = () => (state) => state.allBasket.entities;

export default allBasketReducer;
