import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import BlockSizesValue from "./blockSizeValue";
import PropTypes from "prop-types";
import handleChangeQuantityFunc from "../../../../utils/changeSizes";
import { toast } from "react-toastify";
import productService from "../../../../services/product.service";
import Loader from "../../../common/loader/loader";

const CardHaveProduct = ({ quantity, image, id }) => {
    const { changeQuantity } = productService;
    const [quantityObject, setQuantityObject] = useState([
        { sizes: 37, value: 0 },
        { sizes: 38, value: 0 },
        { sizes: 39, value: 0 },
        { sizes: 40, value: 0 },
        { sizes: 41, value: 0 },
        { sizes: 42, value: 0 },
        { sizes: 43, value: 0 },
        { sizes: 44, value: 0 },
        { sizes: 45, value: 0 },
        { sizes: 46, value: 0 },
        { sizes: 47, value: 0 },
        { sizes: 48, value: 0 }
    ]);
    useEffect(() => {
        function handleCycle(quantity, itemSizesObject) {
            let objectSizeValue = null;
            quantity.forEach((item) => {
                if (item.sizes === itemSizesObject.sizes) {
                    objectSizeValue = item;
                    return item;
                }
            });
            if (objectSizeValue !== null) {
                return objectSizeValue;
            }
            return itemSizesObject;
        }

        const getNewModifiedSizesValueObject = () => {
            if (quantity) {
                const newArraySizes = quantityObject.map((item) => {
                    const callHandleCycle = handleCycle(quantity, item);
                    return callHandleCycle;
                });
                return newArraySizes;
            }
        };
        const modifedArray = getNewModifiedSizesValueObject();
        setQuantityObject(modifedArray);
    }, []);

    const handleChangeQuantity = (object, { target }) => {
        handleChangeQuantityFunc(
            object,
            target,
            setQuantityObject,
            quantityObject
        );
    };
    const submitDataQuantity = async () => {
        const filterSizesArray = quantityObject.filter(
            (item) => item.value !== 0
        );
        try {
            if (filterSizesArray.length !== 0) {
                await changeQuantity(id, filterSizesArray);
                window.location.reload();
            }
            if (filterSizesArray.length === 0) {
                toast.error("Удалите товар в другой вкладке");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return !quantity ? (
        <Loader />
    ) : (
        <div className={styles.cardWrapp}>
            <div className={styles.flexElemBlockImg}>
                <div className={styles.imgWrappForCardHave}>
                    <img src={image} className={styles.img} alt="image" />
                </div>
            </div>
            <div className={styles.flexElemInfo}>
                <div className={styles.flexInfo}>1.Size - 2.Value</div>
                <div className={styles.flexElemSizes}>
                    {quantityObject.map((item) => {
                        return (
                            <BlockSizesValue
                                key={item.sizes}
                                object={item}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        );
                    })}
                </div>
                <button className={styles.button} onClick={submitDataQuantity}>
                    Принять
                </button>
            </div>
        </div>
    );
};
CardHaveProduct.propTypes = {
    quantity: PropTypes.array,
    image: PropTypes.string,
    id: PropTypes.string
};

export default CardHaveProduct;
