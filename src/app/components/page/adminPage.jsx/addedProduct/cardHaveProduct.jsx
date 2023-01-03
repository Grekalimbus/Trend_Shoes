import React from "react";
import styles from "./index.module.css";
import BlockSizesValue from "./blockSizeValue";
const CardHaveProduct = () => {
    return (
        <div className={styles.cardWrapp}>
            <div className={styles.flexElemBlockImg}>
                <div className={styles.imgWrappForCardHave}>
                    <img
                        src="https://i.postimg.cc/9M0zb98C/1-Photo-Room.png"
                        className={styles.img}
                        alt="image"
                    />
                </div>
            </div>
            <div className={styles.flexElemInfo}>
                <div className={styles.flexInfo}>
                    1.Size - 2.Value: Name Lakai
                </div>
                <div className={styles.flexElemSizes}>
                    <BlockSizesValue />
                    <BlockSizesValue />
                    <BlockSizesValue />
                    <BlockSizesValue />
                    <BlockSizesValue />
                    <BlockSizesValue />
                    <BlockSizesValue />
                    <BlockSizesValue />
                    <BlockSizesValue />
                    <BlockSizesValue />
                </div>
                <button className={styles.button}>Принять</button>
            </div>
        </div>
    );
};

export default CardHaveProduct;
