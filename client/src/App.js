import React, { useEffect } from "react";
import styles from "./index.module.css";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./app/layouts/mainPage";
import ProductPage from "./app/layouts/productPage";
import CardPage from "./app/components/page/cardPage/cardPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./app/components/ui/header/header";
import Footer from "./app/components/ui/footer/footer";
import BasketPage from "./app/components/page/basketPage/basketPage";
import FormPage from "./app/components/page/formPage/formPage";
import LoginPage from "./app/components/page/loginPage/loginPage";
import Purchases from "./app/components/common/purchasesPage/purchases";
import AdminPage from "./app/components/page/adminPage.jsx/adminPage";
import { useDispatch, useSelector } from "react-redux";
import { loadFirmList } from "./app/store/firm";
import { loadUser, refreshTokenChek } from "./app/store/user";
import localStorageService from "./app/services/localStorage.service";
import { getErrorProduct, getProduct, loadProduct } from "./app/store/product";
import { loadUserPurchases } from "./app/store/userPurchases";
import { loadAllPurchases } from "./app/store/allPurchases";
import { loadAllBasket } from "./app/store/allBasket";
import { loadBasketUser } from "./app/store/basketUser";
function App() {
    const error = useSelector(getErrorProduct());
    const product = useSelector(getProduct());
    const dispatch = useDispatch();
    useEffect(() => {
        refreshTokenChek();
        dispatch(loadBasketUser());
        dispatch(loadAllBasket());
        dispatch(loadAllPurchases());
        dispatch(loadUserPurchases());
        dispatch(loadFirmList());
        dispatch(loadProduct());
        if (localStorageService.getAccessToken()) {
            dispatch(loadUser());
        }
    }, []);

    if (error) {
        if (error === "Network Error") {
            return (
                <div>
                    <h1>Network Error</h1>
                    <h2>Попробуйте включить VPN или зайти позже</h2>
                </div>
            );
        }
        return <h1>{error}</h1>;
    }
    if (!product) {
        return <h1>Loading</h1>;
    } else {
        return (
            <div className={styles.wrapperPage}>
                <Header />
                <main className={styles.mainPage}>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route
                            exact
                            path="/productPage/:cardID?"
                            component={ProductPage}
                        />
                        <Route
                            exact
                            path="/cardPage/:id?"
                            component={CardPage}
                        />
                        <Route
                            exact
                            path="/login/:exit?"
                            component={LoginPage}
                        />
                        <Route
                            exact
                            path="/basketPage/"
                            component={BasketPage}
                        />
                        <Route exact path="/formPage/" component={FormPage} />
                        <Route exact path="/purchases/" component={Purchases} />
                        <Route
                            exact
                            path="/adminPage/:other?"
                            component={AdminPage}
                        />

                        <Redirect to="/" />
                    </Switch>
                </main>
                <Footer />

                <ToastContainer />
            </div>
        );
    }
}

export default App;
