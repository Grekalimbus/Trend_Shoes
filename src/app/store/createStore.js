// сущности: product/firm/users/historyPurchases
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./product";
import userReducer from "./user";
import firmReducer from "./firm";

const rootReducer = combineReducers({
    firm: firmReducer,
    user: userReducer,
    product: productReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
