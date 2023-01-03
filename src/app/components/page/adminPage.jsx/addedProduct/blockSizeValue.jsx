import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const BlockSizesValue = ({ object, handleChangeQuantity }) => {
    return (
        <div className={styles.sizeValue}>
            <div className={styles.flexSizeValue}>{object.sizes}</div>
            <div className={styles.flexSizeValue}>{object.value}</div>
            <div className={styles.flexSizeValue}>
                <div
                    className={styles.stateSize}
                    onClick={(e) => {
                        handleChangeQuantity(object, e);
                    }}
                >
                    +
                </div>
                <div
                    className={styles.stateSize}
                    onClick={(e) => {
                        handleChangeQuantity(object, e);
                    }}
                >
                    -
                </div>
            </div>
        </div>
    );
};
BlockSizesValue.propTypes = {
    object: PropTypes.object,
    handleChangeQuantity: PropTypes.func
};
export default BlockSizesValue;
