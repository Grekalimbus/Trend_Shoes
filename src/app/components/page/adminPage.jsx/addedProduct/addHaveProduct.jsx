import React from "react";
import styles from "./index.module.css";
import CardHaveProduct from "./cardHaveProduct";

const AddHaveProduct = () => {
    return (
        <div className={styles.wrapAddHaveProduct}>
            <CardHaveProduct />
            <CardHaveProduct />
            <CardHaveProduct />
            <CardHaveProduct />
        </div>
    );
};
export default AddHaveProduct;
