import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const CardPurchases = ({ historyPurchases }) => {
    const { dataForm, quantity } = historyPurchases;
    const filterQuantity = quantity.filter((item) => {
        return item.value !== 0;
    });
    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return historyPurchases === undefined ? (
        <div>Loading</div>
    ) : (
        <div className={styles.cardInfo}>
            <div className={styles.elemFlex}>
                <div className={styles.flexElemInfo}>
                    <div className={styles.mainTitle}>
                        Данные заполненные в форме
                    </div>
                    <div className={styles.inforTitle}>
                        ФИО: {dataForm.user}
                    </div>
                    <div className={styles.inforTitle}>
                        Почта: {dataForm.email}
                    </div>
                    <div className={styles.inforTitle}>
                        Телефон: {dataForm.phone}
                    </div>
                    <div className={styles.inforTitle}>
                        Телеграм: {dataForm.telegram}
                    </div>
                    <div className={styles.inforTitle}>
                        Адрес: {dataForm.adress}
                    </div>
                    <div className={styles.inforTitle}>
                        Дата оформления заказа: {historyPurchases.date}
                    </div>
                </div>
                <div className={styles.flexElemInfo}>
                    <div className={styles.mainTitle}>Данные о товаре</div>
                    <div className={styles.inforTitle}>
                        {historyPurchases.name}
                    </div>
                    <div className={styles.inforTitle}>
                        Цена: {historyPurchases.price}
                    </div>

                    {filterQuantity.map((item) => {
                        return (
                            <div
                                key={
                                    item.sizes +
                                    randomIntFromInterval(1, 500) +
                                    historyPurchases.date
                                }
                                className={styles.inforTitle}
                            >
                                Размер: {`(${item.sizes})`} - кол-во{" "}
                                {`(${item.value})`}
                            </div>
                        );
                    })}

                    <div className={styles.inforTitle}>
                        ID Товара: {historyPurchases._id}
                    </div>
                </div>
            </div>
            <div className={styles.elemFlexTwo}>
                <div className={styles.wrappImg}>
                    <img
                        className={styles.img}
                        src={historyPurchases.imgProduct[0]}
                        alt="imageProduct"
                    />
                </div>
            </div>
        </div>
    );
};

CardPurchases.propTypes = {
    historyPurchases: PropTypes.object
};

export default CardPurchases;
