import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";
import httpServices from "../../../services/http.service";
import { Link } from "react-router-dom";

const BlockInfoProduct = ({ data, handleOrder }) => {
    const [firm, setFirm] = useState(null);
    const [activSize, setActivSize] = useState("");

    const getQuantity = () => {
        let quantityProduct = 0;
        if (Object.keys(data).length !== 0) {
            data.quantity.forEach((item) => {
                quantityProduct += item.value;
            });

            return quantityProduct;
        }
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
    const activeSize = ({ target }) => {
        setActivSize(target.value);
    };
    const basket = [];
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
                                                activeSize(e);
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
                                    activSize === ""
                                        ? styles.buttonBay
                                        : styles.buttonBayActiv
                                }
                                onClick={() => {
                                    handleOrder(
                                        activSize === ""
                                            ? activSize
                                            : Number(activSize)
                                    );
                                }}
                            >
                                Добавить в корзину
                            </button>
                            <div className={styles.boxSizeValue}>
                                <h2 className={styles.hActivSize}>
                                    {activSize}
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
    handleOrder: PropTypes.func
};

export default BlockInfoProduct;
