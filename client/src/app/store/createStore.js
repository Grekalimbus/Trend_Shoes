// сущности: product/firm/users/historyPurchases
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./product";
import userReducer from "./user";
import firmReducer from "./firm";
import userPurchasesReducer from "./userPurchases";
import allPurchasesReducer from "./allPurchases";
import allBasketReducer from "./allBasket";
import basketUserReducer from "./basketUser";

const rootReducer = combineReducers({
    firm: firmReducer,
    user: userReducer,
    product: productReducer,
    userPurchases: userPurchasesReducer,
    allPurchases: allPurchasesReducer,
    allBasket: allBasketReducer,
    basketUser: basketUserReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
