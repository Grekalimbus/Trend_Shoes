import { createSlice } from "@reduxjs/toolkit";

const firmSlice = createSlice({
    name: "firm",
    initialState: {
        entities: null,
        isLoading: true
    }
});

const { reducer: firmReducer } = firmSlice;

export default firmReducer;
