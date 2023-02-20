import { createSlice } from "@reduxjs/toolkit";
import httpServices from "../services/http.service";
import localStorageService from "../services/localStorage.service";

const userPurchases = createSlice({
    name: "userPurchases",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFeatch: null
    },
    reducers: {
        userPurchasesRequested(state, actions) {
            state.isLoading = true;
        },
        userPurchasesReceved(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
            state.lastFeatch = Date.now();
        },
        userPurchasesRequestFiled(state, actions) {
            console.log(actions);
        }
    }
});

const { reducer: userPurchasesReducer, actions } = userPurchases;
const {
    userPurchasesRequested,
    userPurchasesReceved,
    userPurchasesRequestFiled
} = actions;

function isOutDate(date) {
    if (date !== null || Date.now() - date > 5 * 60 * 1000) {
        return true;
    }
    return false;
}

const userID = localStorageService.getUserId();
export const loadUserPurchases = () => async (dispatch, getState) => {
    const { lastFeatch } = getState().userPurchases;
    if (isOutDate(lastFeatch)) {
        dispatch(userPurchasesRequested());
        try {
            const { data } = await httpServices.get(
                `historyPurchases/${userID}`
            );
            dispatch(userPurchasesReceved(data));
        } catch (error) {
            dispatch(userPurchasesRequestFiled(error.message));
        }
    }
};

export const getUserPurchases = () => (state) => state.userPurchases.entities;

export default userPurchasesReducer;
