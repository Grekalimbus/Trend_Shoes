import { createSlice } from "@reduxjs/toolkit";
import httpServices from "../services/http.service";

const allPurchases = createSlice({
    name: "allPurchases",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFeatch: null
    },
    reducers: {
        allPurchasesRequested(state, actions) {
            state.isLoading = true;
        },
        allPurchasesReceved(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
            state.lastFeatch = Date.now();
        },
        allPurchasesRequestFiled(state, actions) {
            console.log(actions);
        }
    }
});

const { reducer: allPurchasesReducer, actions } = allPurchases;
const { allPurchasesRequested, allPurchasesReceved, allPurchasesRequestFiled } =
    actions;

function isOutDate(date) {
    if (date !== null || Date.now() - date > 5 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadAllPurchases = () => async (dispatch, getState) => {
    const { lastFeatch } = getState().allPurchases;
    if (isOutDate(lastFeatch)) {
        dispatch(allPurchasesRequested());
        try {
            const { data } = await httpServices.get(`historyPurchases`);
            dispatch(allPurchasesReceved(data));
        } catch (error) {
            dispatch(allPurchasesRequestFiled(error.message));
        }
    }
};

export const getAllPurchases = () => (state) => state.allPurchases.entities;

export default allPurchasesReducer;
