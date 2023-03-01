import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import img from "../../../../img/basket.png";
import PropTypes from "prop-types";
import servicesBascket from "../../../utils/servisecBascket";
import { useSelector } from "react-redux";
import { getProduct } from "../../../store/product";
import { toast } from "react-toastify";
import { basketService } from "../../../services/basket.service";
import { getUser } from "../../../store/user";
import { getBasketUser } from "../../../store/basketUser";

const CardBasket = ({
    dataProduct,
    handleIncrementAmount,
    handleDecrementAmount
}) => {
    const [data, setData] = useState(dataProduct);
    const [activeImg, setAvtiveImg] = useState(data.imgProduct[0]);
    const [activeSize, setActiveSize] = useState(null);
    const [dataSizes, setDataSizes] = useState(null);
    const { increment } = basketService;
    const userId = useSelector(getUser());
    const basketFromDB = useSelector(getBasketUser());
    const product = useSelector(getProduct()).filter(
        (item) => item._id === data._id
    );
    useEffect(() => {
        if (product) {
            setDataSizes(product[0].quantity);
        }
    }, [product]);

    const quantityProduct = () => {
        let value = 0;
        data.quantity.forEach((item) => {
            value += item.value;
        });
        return value;
    };
    const changeAvtiveImg = ({ target }) => {
        setAvtiveImg(target.alt);
    };

    const handleIncrement = () => {
        if (!activeSize) {
            toast.error("Укажите размер");
        } else if (userId && data) {
            increment(
                data,
                activeSize,
                dataSizes,
                setData,
                userId,
                basketFromDB
            );
        }

        // servicesBascket.increment(activeSize, data, setData, dataSizes);
        // data.quantity.forEach((item, index) => {
        //     if (
        //         item.sizes === activeSize &&
        //         item.value !== dataSizes[index].value
        //     ) {
        //         handleIncrementAmount(data.price);
        //     }
        // });
    };
    const handleDecrement = () => {
        servicesBascket.decrement(activeSize, data, setData, setData);
        data.quantity.forEach((item) => {
            if (item.sizes === activeSize && item.value < 1) {
                handleIncrementAmount(data.price);
            }
        });
        handleDecrementAmount(data.price);
    };
    const deleteProduct = () => {
        servicesBascket.delete(data);
    };
    const changeActiveSize = (size) => {
        setActiveSize(size);
    };
    return (
        <div className={styles.flex}>
            <div className={styles.flexSmalImg}>
                {data.imgProduct.map((item) => {
                    return (
                        <div
                            onClick={(e) => {
                                changeAvtiveImg(e);
                            }}
                            key={item}
                            className={
                                item !== activeImg
                                    ? styles.smalDivImg
                                    : styles.smalDivImgActive
                            }
                        >
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
                        src={activeImg}
                        alt={data.imgProduct[0]}
                        className={styles.smalImg}
                    />
                </div>
                <div className={styles.blockButtonChange}>
                    <div
                        className={styles.elemButtonChange}
                        onClick={handleIncrement}
                    >
                        +
                    </div>
                    <div className={styles.elemButtonChange}>
                        {quantityProduct()}
                    </div>
                    <div
                        className={styles.elemButtonChange}
                        onClick={handleDecrement}
                    >
                        -
                    </div>
                </div>
                <div className={styles.blockInfo}>
                    <div className={styles.elemInfo}>{data.name}</div>
                    <div className={styles.elemInfo}>id: {data._id}</div>
                    <div className={styles.elemInfo}>
                        Стоимость: {data.price}
                    </div>
                    <div className={styles.elemInfo}>Размеры</div>
                    <div className={styles.elemSizes}>
                        {data.quantity.map((item) => {
                            return (
                                <div
                                    key={item.sizes}
                                    className={
                                        activeSize !== item.sizes
                                            ? styles.buttondSizes
                                            : styles.buttondSizesActive
                                    }
                                    onClick={() => {
                                        changeActiveSize(item.sizes);
                                    }}
                                >
                                    {`${item.sizes}(${item.value})`}{" "}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.blockDelete} onClick={deleteProduct}>
                    <img src={img} alt="basket" className={styles.basketImg} />
                </div>
            </div>
            <div></div>
        </div>
    );
};

CardBasket.propTypes = {
    dataProduct: PropTypes.object,
    handleIncrementAmount: PropTypes.func,
    handleDecrementAmount: PropTypes.func
};
export default CardBasket;
