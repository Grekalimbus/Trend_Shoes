import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";
import httpServices from "../../../services/http.service";
import { Link } from "react-router-dom";

const BlockInfoProduct = ({ data, handleAddProduct, dataSizes }) => {
    const [firm, setFirm] = useState(null);
    const [activeSize, setactiveSize] = useState("");

    const getQuantity = () => {
        let quantityProduct = 0;
        if (dataSizes !== null) {
            dataSizes.forEach((item) => {
                quantityProduct += item.value;
            });
            return quantityProduct;
        }
        return quantityProduct;
    };
    const getSizes = () => {
        if (Object.keys(data).length !== 0) {
            const arrSizes = data.quantity.map((item) => {
                return item.sizes;
            });
            return arrSizes;
        }
    };

    useEffect(() => {
        const getFirm = async () => {
            try {
                const { data } = await httpServices.get(`firm/.json`);
                setFirm(data);
            } catch (error) {
                console.log("expectedErrors");
            }
        };
        getFirm();
    }, []);
    const changeSize = ({ target }) => {
        setactiveSize(target.value);
    };
    return (
        <div className={styles.flex}>
            <div className={styles.infoBlockDiv} style={{ width: "100%" }}>
                {Object.keys(data).length === 0 || firm === null ? (
                    <h1>loading</h1>
                ) : (
                    <div>
                        <h1 className={styles.h1}>{data.name}</h1>
                        <h2 className={styles.h2}>id: {data._id}</h2>
                        <h2 className={styles.h2}>Стоимость: {data.price}</h2>
                        <h2 className={styles.h2}>
                            Фирма: {firm[data.firm].name}
                        </h2>
                        <h2 className={styles.h2}>
                            Количество: {getQuantity()}
                        </h2>

                        <div className={styles.blockSizesFlex}>
                            <h2 className={styles.hSize}>Размеры</h2>
                            <div className={styles.boxSizes}>
                                {getSizes().map((item) => {
                                    return (
                                        <button
                                            key={item}
                                            value={item}
                                            className={styles.buttonSize}
                                            onClick={(e) => {
                                                changeSize(e);
                                            }}
                                        >
                                            {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.boxBay}>
                            <button
                                className={
                                    activeSize === ""
                                        ? styles.buttonBay
                                        : styles.buttonBayActiv
                                }
                                onClick={() => {
                                    handleAddProduct(
                                        activeSize === ""
                                            ? activeSize
                                            : Number(activeSize)
                                    );
                                }}
                            >
                                Добавить в корзину
                            </button>
                            <div className={styles.boxSizeValue}>
                                <h2 className={styles.hActiveSize}>
                                    {activeSize}
                                </h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Link to="/basketPage" className={styles.basket}>
                Корзина
            </Link>
        </div>
    );
};

BlockInfoProduct.propTypes = {
    data: PropTypes.object,
    handleAddProduct: PropTypes.func,
    dataSizes: PropTypes.array
};

export default BlockInfoProduct;
