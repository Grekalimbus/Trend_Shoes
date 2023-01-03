import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const AddProductPage = () => {
    return (
        <div className={styles.wrappAddProductPage}>
            <Link
                to="/adminPage/addHaveProduct"
                className={styles.buttonPickAdd}
            >
                Добавить кол-во существующего товара
            </Link>
            <Link to="/adminPage/addFirm" className={styles.buttonPickAdd}>
                Добавить фирму
            </Link>
            <Link
                to="/adminPage/addNewProduct"
                className={styles.buttonPickAdd}
            >
                Добавить новый товар
            </Link>
        </div>
    );
};

export default AddProductPage;
