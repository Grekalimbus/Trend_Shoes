import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpServices from "../../../services/http.service";
import BlockImg from "./blockImg";
import BlockInfoProduct from "./blockInfoProduct";
import styles from "./card.module.css";
import { toast } from "react-toastify";

const CardPage = () => {
    const [data, setData] = useState(null);
    const [quantitySizes, setQuantitySizes] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await httpServices.get(`product/${id}/.json`);
                setData(data);
                data.quantity.forEach((item) => {
                    setQuantitySizes((prevState) => [
                        ...prevState,
                        { sizes: item.sizes, value: item.value }
                    ]);
                });
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    // метод добавляющий товар в корзину
    const makeOrder = (size) => {
        const basketLocalStorage = JSON.parse(
            localStorage.getItem("storageBasket")
        );
        const basket = [];
        const quantityArray = [];
        const pullDataLocalStorage = () => {
            if (size !== "") {
                quantitySizes.forEach((item) => {
                    quantityArray.push({ sizes: item.sizes, value: 0 });
                });

                quantityArray.forEach((item, index) => {
                    if (item.sizes === size) {
                        if (quantitySizes[index].value !== 0) {
                            item.value += 1;
                        } else {
                            toast.info("Этого размера уже нет в наличии");
                        }
                    }
                });
                basket.push({ ...data, quantity: quantityArray });
                basketLocalStorage.push(basket[0]);
                const stringDataLocalStorage =
                    JSON.stringify(basketLocalStorage);
                localStorage.setItem("storageBasket", stringDataLocalStorage);
                toast.success("Товар добавлен в корзину");
            } else if (size === "") {
                toast.info("Выберите нужный размер");
            }
        };

        if (size === "") {
            toast.info("Выберите нужный размер");
        } else if (size !== "") {
            if (basketLocalStorage.length !== 0) {
                const conditionForArr = basketLocalStorage.every((obj) => {
                    return obj._id !== id;
                });
                if (conditionForArr === true) {
                    pullDataLocalStorage();
                }
                basketLocalStorage.forEach((objectProduct) => {
                    if (objectProduct._id === id) {
                        objectProduct.quantity.forEach((item, index) => {
                            if (
                                JSON.stringify(item) ===
                                JSON.stringify(data.quantity[index])
                            ) {
                                if (item.sizes === size) {
                                    toast.info("Размеров больше нет");
                                }
                            } else if (
                                JSON.stringify(item) !==
                                JSON.stringify(data.quantity[index])
                            ) {
                                if (item.sizes === size) {
                                    item.value += 1;
                                    const stringLocalStorage =
                                        JSON.stringify(basketLocalStorage);
                                    localStorage.setItem(
                                        "storageBasket",
                                        stringLocalStorage
                                    );
                                    toast.success("Товар добавлен в корзину");
                                }
                            }
                        });
                    }
                });
            } else if (basketLocalStorage.length === 0) {
                pullDataLocalStorage();
            }
        }
        console.log(basketLocalStorage);
    };

    return (
        <div className={styles.flex}>
            <div className={styles.blockImg}>
                <BlockImg image={data !== null ? data.imgProduct : []} />
            </div>
            <div className={styles.blockInfo}>
                <BlockInfoProduct
                    data={data !== null ? data : {}}
                    makeOrder={makeOrder}
                />
            </div>
        </div>
    );
};

export default CardPage;
