import React, { useEffect, useState } from "react";
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
import httpServices from "./app/services/http.service";
import FormPage from "./app/components/page/formPage/formPage";

function App() {
    const [dataCart, setDataCart] = useState(null);
    const [dataSizes, setDataSizes] = useState(null);
    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const { data } = await httpServices.get("product/.json");
                const arrData = Object.keys(data).map((item) => data[item]);

                // Размеры (объекты)
                const arrSizes = arrData.map((item) => {
                    return (item = item.quantity);
                });
                const nullSizes = arrSizes.map((qu) => {
                    const objectsSize = qu.map((item) => {
                        return (item = { sizes: item.sizes, value: 0 });
                    });
                    return (qu = objectsSize);
                });

                const dataForCart = arrData.map((item, index) => {
                    return (item = { ...item, quantity: nullSizes[index] });
                });
                setDataSizes(nullSizes);
                setDataCart(dataForCart);
            } catch (error) {
                console.log(error);
            }
        };
        getAllProduct();
    }, []);
    if (dataCart !== null) {
        if (
            !localStorage.getItem("storageBasket") ||
            JSON.parse(localStorage.getItem("storageBasket")).length === 0
        ) {
            const stringDataCart = JSON.stringify(dataCart);
            localStorage.setItem("storageBasket", stringDataCart);
        }
    }
    if (dataSizes !== null) {
        if (
            !localStorage.getItem("dataSizes") ||
            JSON.parse(localStorage.getItem("dataSizes")).length === 0
        ) {
            const stringDataCart = JSON.stringify(dataSizes);
            localStorage.setItem("dataSizes", stringDataCart);
        }
    }
    // console.log(JSON.parse(localStorage.getItem("dataSizes")));
    // console.log(JSON.parse(localStorage.getItem("storageBasket")));
    // localStorage.setItem("balance", 10000);

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
                    <Route exact path="/formPage/" component={FormPage} />
                    <Redirect to="/" />
                </Switch>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default App;
