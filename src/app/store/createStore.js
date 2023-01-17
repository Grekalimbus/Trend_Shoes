// сущности: product/firm/users/historyPurchases
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import firmReducer from "./firm";

const rootReducer = combineReducers({ firm: firmReducer });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
