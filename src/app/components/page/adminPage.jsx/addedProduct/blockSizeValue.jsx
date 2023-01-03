import React from "react";
import styles from "./index.module.css";

const BlockSizesValue = () => {
    return (
        <div className={styles.sizeValue}>
            <div className={styles.flexSizeValue}>42</div>
            <div className={styles.flexSizeValue}>6</div>
            <div className={styles.flexSizeValue}>
                <div className={styles.stateSize}>+</div>
                <div className={styles.stateSize}>-</div>
            </div>
        </div>
    );
};

export default BlockSizesValue;
