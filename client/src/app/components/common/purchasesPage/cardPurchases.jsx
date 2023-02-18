import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const CardPurchases = ({ historyPurchases }) => {
    const { history } = historyPurchases;
    const filterQuantity = history
        ? history.quantity.filter((item) => {
              return item.value !== 0;
          })
        : null;
    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return !history ? (
        <div>Loading</div>
    ) : (
        <div className={styles.cardInfo}>
            <div className={styles.elemFlexTwo}>
                <div className={styles.wrappImg}>
                    <img
                        className={styles.img}
                        src={history.imgProduct[0]}
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
                        ФИО: {history.dataForm.user}
                    </div>
                    <div className={styles.inforTitle}>
                        Почта: {history.dataForm.email}
                    </div>
                    <div className={styles.inforTitle}>
                        Телефон: {history.dataForm.phone}
                    </div>
                    <div className={styles.inforTitle}>
                        Телеграм: {history.dataForm.telegram}
                    </div>
                    <div className={styles.inforTitle}>
                        Адрес: {history.dataForm.adress}
                    </div>
                    <div className={styles.inforTitle}>
                        Дата оформления заказа: {history.date}
                    </div>
                </div>
                <div className={styles.flexElemInfo}>
                    <div className={styles.mainTitle}>Данные о товаре</div>
                    <div className={styles.inforTitle}>{history.name}</div>
                    <div className={styles.inforTitle}>
                        Цена: {history.price}
                    </div>

                    {filterQuantity.map((item) => {
                        return (
                            <div
                                key={
                                    item.sizes +
                                    randomIntFromInterval(1, 500) +
                                    history.date
                                }
                                className={styles.inforTitle}
                            >
                                Размер: {`(${item.sizes})`} - кол-во{" "}
                                {`(${item.value})`}
                            </div>
                        );
                    })}

                    <div className={styles.inforTitle}>
                        ID Товара: {history._id}
                    </div>
                </div>
            </div>
        </div>
    );
};

CardPurchases.propTypes = {
    historyPurchases: PropTypes.array
};

export default CardPurchases;
