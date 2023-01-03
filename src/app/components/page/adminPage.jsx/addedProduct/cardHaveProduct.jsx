import React from "react";
import styles from "./index.module.css";
import BlockSizesValue from "./blockSizeValue";
import PropTypes from "prop-types";

const CardHaveProduct = ({ quantity, image }) => {
    const sizesObject = [
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
    ];

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
            const newArraySizes = sizesObject.map((item) => {
                const callHandleCycle = handleCycle(quantity, item);
                return callHandleCycle;
            });
            return newArraySizes;
        }
    };
    const newSizeValueObject = getNewModifiedSizesValueObject();
    return (
        <div className={styles.cardWrapp}>
            <div className={styles.flexElemBlockImg}>
                <div className={styles.imgWrappForCardHave}>
                    <img src={image} className={styles.img} alt="image" />
                </div>
            </div>
            <div className={styles.flexElemInfo}>
                <div className={styles.flexInfo}>
                    1.Size - 2.Value: Name Lakai
                </div>
                <div className={styles.flexElemSizes}>
                    {newSizeValueObject.map((item) => {
                        return (
                            <BlockSizesValue key={item.sizes} object={item} />
                        );
                    })}
                </div>
                <button className={styles.button}>Принять</button>
            </div>
        </div>
    );
};
CardHaveProduct.propTypes = {
    quantity: PropTypes.array,
    image: PropTypes.string
};

export default CardHaveProduct;
