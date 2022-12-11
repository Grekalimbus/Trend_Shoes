import React from "react";
import styles from "./index.module.css";
import img from "../../../../img/basket.png";
import PropTypes from "prop-types";

const CardBasket = ({ data }) => {
    const sizes = () => {
        let stringSize = "";
        data.quantity.forEach((item) => {
            stringSize += `${item.sizes}(${item.value})`;
        });
        return stringSize;
    };
    const quantityProduct = () => {
        let value = 0;
        data.quantity.forEach((item) => {
            value += item.value;
        });
        return value;
    };
    return (
        <div className={styles.flex}>
            <div className={styles.flexSmalImg}>
                {data.imgProduct.map((item) => {
                    return (
                        <div key={item} className={styles.smalDivImg}>
                            <img
                                src={item}
                                alt={item}
                                className={styles.smalImg}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={styles.blockBasketCard}>
                <div className={styles.elemImage}>
                    <img
                        src={data.imgProduct[0]}
                        alt={data.imgProduct[0]}
                        className={styles.smalImg}
                    />
                </div>
                <div className={styles.blockButtonChange}>
                    <div className={styles.elemButtonChange}>+</div>
                    <div className={styles.elemButtonChange}>
                        {quantityProduct()}
                    </div>
                    <div className={styles.elemButtonChange}>-</div>
                </div>
                <div className={styles.blockInfo}>
                    <div className={styles.elemInfo}>{data.name}</div>
                    <div className={styles.elemInfo}>id: {data._id}</div>
                    <div className={styles.elemInfo}>
                        Стоимость: {data.price}
                    </div>
                    <div className={styles.elemInfo}>Размеры : {sizes()}</div>
                </div>
                <div className={styles.blockDelete}>
                    <img src={img} alt="basket" className={styles.basketImg} />
                </div>
            </div>
            <div></div>
        </div>
    );
};

CardBasket.propTypes = {
    data: PropTypes.object
};
export default CardBasket;
