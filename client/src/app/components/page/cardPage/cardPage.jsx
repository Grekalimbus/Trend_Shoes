import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpServices from "../../../services/http.service";
import BlockImg from "./blockImg";
import BlockInfoProduct from "./blockInfoProduct";
import styles from "./card.module.css";
import servicesBascket from "../../../utils/servisecBascket";

const CardPage = () => {
    const [data, setData] = useState(null);
    // const [activeSize, setActiveSize] = useState(null);
    const [dataSizes, setDataSizes] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const getDataQuantity = async () => {
            const dataQuantity = await httpServices
                .get(`/product/${id}/quantity`)
                .then((res) => setDataSizes(res.data));
        };
        getDataQuantity();
        const basketLocalStorage = JSON.parse(
            localStorage.getItem("storageBasket")
        );
        const filterData = basketLocalStorage.filter((item) => item._id === id);
        setData(filterData[0]);
    }, []);

    const handleAddProduct = (activeSize) => {
        servicesBascket.increment(activeSize, data, setData, dataSizes);
    };

    return data === null && dataSizes === null ? (
        <h1>Loading</h1>
    ) : (
        <div className={styles.flex}>
            <div className={styles.blockImg}>
                <BlockImg image={data.imgProduct} />
            </div>
            <div className={styles.blockInfo}>
                <BlockInfoProduct
                    dataSizes={dataSizes}
                    data={data}
                    handleAddProduct={handleAddProduct}
                />
            </div>
        </div>
    );
};

export default CardPage;
