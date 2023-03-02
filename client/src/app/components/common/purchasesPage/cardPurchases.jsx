import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import Loader from "../loader/loader";

const CardPurchases = ({ historyPurchases }) => {
    const filterQuantity = historyPurchases
        ? historyPurchases.quantity.filter((item) => {
              return item.value !== 0;
          })
        : null;
    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return !historyPurchases ? (
        <Loader />
    ) : (
        <div className={styles.cardInfo}>
            <div className={styles.elemFlexTwo}>
                <div className={styles.wrappImg}>
                    <img
                        className={styles.img}
                        src={historyPurchases.imgProduct[0]}
                        alt="imageProduct"
                    />
                </div>
            </div>
            <div className={styles.elemFlex}>
                <div className={styles.flexElemInfo}>
                    <div className={styles.mainTitle}>
                        Данные заполненные в форме
                    </div>
                    <div className={styles.inforTitle}>
                        ФИО: {historyPurchases.dataForm.user}
                    </div>
                    <div className={styles.inforTitle}>
                        Почта: {historyPurchases.dataForm.email}
                    </div>
                    <div className={styles.inforTitle}>
                        Телефон: {historyPurchases.dataForm.phone}
                    </div>
                    <div className={styles.inforTitle}>
                        Телеграм: {historyPurchases.dataForm.telegram}
                    </div>
                    <div className={styles.inforTitle}>
                        Адрес: {historyPurchases.dataForm.adress}
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
        </div>
    );
};

CardPurchases.propTypes = {
    historyPurchases: PropTypes.object
};

export default CardPurchases;
