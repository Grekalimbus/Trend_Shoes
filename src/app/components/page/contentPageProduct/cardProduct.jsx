import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CardProduct = ({ name, imgUrl, price, idCard }) => {
    return (
        <div className={styles.cardProduct}>
            <div className={styles.imgContent}>
                <img className={styles.img} src={imgUrl} alt={name} />
            </div>

            <div className={styles.contentTitle}>
                <h3>{name}</h3>
                <h3>Стоимость: {price} ₽</h3>
                <Link to={`/productPage/${idCard}`}>
                    <button className={styles.buttonCard}>
                        Открыть карточку
                    </button>
                </Link>
            </div>
        </div>
    );
};

CardProduct.propTypes = {
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.string,
    idCard: PropTypes.string
};

export default CardProduct;
