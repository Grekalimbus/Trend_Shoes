import { createSlice } from "@reduxjs/toolkit";
import httpServices from "../services/http.service";

const firmSlice = createSlice({
    name: "firm",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        firmRequested(state) {
            state.isLoading = true;
        },
        firmReceved(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
        },
        firmRequestFiled(state, actions) {
            state.error = actions.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: firmReducer, actions } = firmSlice;
const { firmRequested, firmReceved, firmRequestFiled } = actions;

export const loadFirmList = () => async (dispatch) => {
    dispatch(firmRequested());
    try {
        const { data } = await httpServices.get("firm/.json");
        dispatch(firmReceved(data));
    } catch (error) {
        dispatch(firmRequestFiled(error.message));
    }
};

export default firmReducer;
