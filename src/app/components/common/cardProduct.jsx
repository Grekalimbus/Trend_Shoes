import React from "react";
import styles from "./cardStyle.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CardProduct = ({
    name,
    imgUrl,
    price,
    idCard,
    buttonTitle,
    handleDeletProduct
}) => {
    return (
        <div className={styles.cardProduct}>
            <div className={styles.imgContent}>
                <img className={styles.img} src={imgUrl} alt={name} />
            </div>

            <div className={styles.contentTitle}>
                <h3>{name}</h3>
                <h3>Стоимость: {price} ₽</h3>
                {buttonTitle === "Открыть карточку" ? (
                    <Link to={`/productPage/${idCard}`}>
                        <button className={styles.buttonCard}>
                            {buttonTitle}
                        </button>
                    </Link>
                ) : (
                    <button
                        className={styles.buttonCard}
                        onClick={() => {
                            handleDeletProduct(idCard);
                        }}
                    >
                        {buttonTitle}
                    </button>
                )}
            </div>
        </div>
    );
};

CardProduct.propTypes = {
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.number,
    idCard: PropTypes.string,
    buttonTitle: PropTypes.string,
    handleDeletProduct: PropTypes.func
};

export default CardProduct;
