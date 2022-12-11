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

function App() {
    // localStorage.setItem("balance", 10000);
    // localStorage.setItem("storageBasket", "[]");

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
                    <Route exact path="/cardPage/:id?" component={CardPage} />
                    <Route exact path="/basketPage/" component={BasketPage} />
                    <Redirect to="/" />
                </Switch>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default App;
