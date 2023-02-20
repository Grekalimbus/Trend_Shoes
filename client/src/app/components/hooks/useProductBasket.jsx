import React, { useEffect, useState } from "react";
import httpServices from "../../services/http.service";
import localStorageService from "../../services/localStorage.service";

const useProductBasket = () => {
    const [dataCart, setDataCart] = useState(null);
    const [dataSizes, setDataSizes] = useState(null);
    useEffect(() => {
        // в dataCart пушатся вся товарка с базы данных, изменяется ключ quantity в котором value везде по 0
        const getAllProduct = async () => {
            try {
                const { data } = await httpServices.get("product");
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
    if (!localStorageService.getAmount()) {
        localStorageService.setAmount(0);
    }
};

export default useProductBasket;
