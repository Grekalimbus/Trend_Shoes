import { createSlice } from "@reduxjs/toolkit";
import httpServices from "../services/http.service";

const firmSlice = createSlice({
    name: "firm",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFeatch: null
    },
    reducers: {
        firmRequested(state) {
            state.isLoading = true;
        },
        firmReceved(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
            state.lastFeatch = Date.now();
        },
        firmRequestFiled(state, actions) {
            state.error = actions.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: firmReducer, actions } = firmSlice;
const { firmRequested, firmReceved, firmRequestFiled } = actions;

function isOutDate(date) {
    if (date !== null || Date.now() - date > 5 * 60 * 1000) {
        return true;
    }
    return false;
}
export const loadFirmList = () => async (dispatch, getState) => {
    const { lastFeatch } = getState().firm;
    if (isOutDate(lastFeatch)) {
        dispatch(firmRequested());
        try {
            const { data } = await httpServices.get("firm");
            dispatch(firmReceved(data));
        } catch (error) {
            dispatch(firmRequestFiled(error.message));
        }
    }
};

export const getFirm = () => (state) => state.firm.entities;
export const getIsLoadingFirmStatus = () => (state) => state.firm.isLoading;

export default firmReducer;
