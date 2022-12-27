import React from "react";
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
import useProductBasket from "./app/components/hooks/useProductBasket";
import AuthProvider from "./app/components/hooks/useAuth";
import ApiProvider from "./app/components/hooks/useApi";
import LoginPage from "./app/components/page/loginPage/loginPage";
import Purchases from "./app/components/common/purchasesPage/purchases";
import AdminPage from "./app/components/page/adminPage.jsx/adminPage";
import StaticPange from "./app/components/page/adminPage.jsx/statisticsPage";

function App() {
    useProductBasket();
    return (
        <div className={styles.wrapperPage}>
            <AuthProvider>
                <ApiProvider>
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
                            <Route
                                exact
                                path="/formPage/"
                                component={FormPage}
                            />
                            <Route
                                exact
                                path="/purchases/"
                                component={Purchases}
                            />
                            <Route
                                exact
                                path="/adminPage/:other?"
                                component={AdminPage}
                            />

                            <Redirect to="/" />
                        </Switch>
                    </main>
                    <Footer />
                </ApiProvider>
            </AuthProvider>

            <ToastContainer />
        </div>
    );
}

export default App;
