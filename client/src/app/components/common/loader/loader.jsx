import React from "react";
import styles from "./index.module.css";

const Loader = () => {
    return (
        <div className={styles.wrapp}>
            <h1 className={styles.title}>Loading</h1>
            <div className={styles.loader}>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loader;
