import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const BlockSizesValue = ({ object }) => {
    return (
        <div className={styles.sizeValue}>
            <div className={styles.flexSizeValue}>{object.sizes}</div>
            <div className={styles.flexSizeValue}>{object.value}</div>
            <div className={styles.flexSizeValue}>
                <div className={styles.stateSize}>+</div>
                <div className={styles.stateSize}>-</div>
            </div>
        </div>
    );
};
BlockSizesValue.propTypes = {
    object: PropTypes.object
};
export default BlockSizesValue;
