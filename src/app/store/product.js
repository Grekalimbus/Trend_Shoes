import { createSlice } from "@reduxjs/toolkit";
import httpServices from "../services/http.service";

const productSlice = createSlice({
    name: "product",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFeatch: null
    },
    reducers: {
        productRequested(state, actions) {
            state.isLoading = true;
        },
        productReceved(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
            state.lastFeatch = Date.now();
        },
        productRequestFiled(state, actions) {
            console.log(actions);
        }
    }
});

const { reducer: productReducer, actions } = productSlice;
const { productRequested, productReceved, productRequestFiled } = actions;

function isOutDate(date) {
    if (date !== null || Date.now() - date > 5 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProduct = () => async (dispatch, getState) => {
    const { lastFeatch } = getState().product;
    if (isOutDate(lastFeatch)) {
        dispatch(productRequested());
        try {
            const { data } = await httpServices.get("/product.json");
            const arrData = [];
            Object.keys(data).forEach((item) => arrData.push(data[item]));
            dispatch(productReceved(arrData));
        } catch (error) {
            dispatch(productRequestFiled(error.message));
        }
    }
};

export const getProduct = () => (state) => state.product.entities;

export default productReducer;
