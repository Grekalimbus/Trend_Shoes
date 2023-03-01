import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpServices from "../../../services/http.service";
import BlockImg from "./blockImg";
import BlockInfoProduct from "./blockInfoProduct";
import styles from "./card.module.css";
import servicesBascket from "../../../utils/servisecBascket";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../store/product";
import { getBasketUser } from "../../../store/basketUser";
import { toast } from "react-toastify";
import { basketService } from "../../../services/basket.service";
import { getUser } from "../../../store/user";

const CardPage = () => {
    const [activeSize, setActiveSize] = useState(null);
    const [dataSizes, setDataSizes] = useState(null);
    const { id } = useParams();
    const userId = useSelector(getUser());

    const product = useSelector(getProduct()).filter((item) => item._id === id);
    const [data, setData] = useState(null);
    const basketUser = useSelector(getBasketUser());
    const { addInitialItemBasket } = basketService;
    useEffect(() => {
        if (product) {
            setDataSizes(product[0].quantity);
            const transformQuantity = product[0].quantity.map((item) => {
                return { sizes: item.sizes, value: 0 };
            });
            const transformProduct = {
                ...product[0],
                quantity: transformQuantity
            };
            setData(transformProduct);
        }
    }, []);

    const handleAddProduct = async (activeSize) => {
        if (!activeSize) {
            toast.error("Укажите размер");
        }
        try {
            if (activeSize && basketUser.length === 0 && userId && product[0]) {
                addInitialItemBasket(
                    activeSize,
                    data,
                    dataSizes,
                    userId._id,
                    product[0]
                );
                window.location.reload();
            } else if (
                activeSize &&
                basketUser.length !== 0 &&
                userId &&
                product[0]
            ) {
                console.log("increment");
            }
        } catch (e) {}

        // servicesBascket.increment(activeSize, data, setData, dataSizes);
    };

    return !dataSizes && !data && !product[0] ? (
        <h1>Loading</h1>
    ) : (
        <div className={styles.flex}>
            <div className={styles.blockImg}>
                <BlockImg image={product[0].imgProduct} />
            </div>
            <div className={styles.blockInfo}>
                <BlockInfoProduct
                    dataSizes={dataSizes}
                    data={product[0]}
                    handleAddProduct={handleAddProduct}
                />
            </div>
        </div>
    );
};

export default CardPage;
