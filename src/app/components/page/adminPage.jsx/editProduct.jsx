import React from "react";
import styles from "./index.module.css";
import { useApi } from "../../hooks/useApi";

const EditProduct = () => {
    const { product } = useApi();
    console.log(product);
    return product === null ? (
        <div>Loading</div>
    ) : (
        <div className={styles.wrapPageEdit}>
            <div className={styles.flexElemProduct}>
                {product.map((item) => {
                    return (
                        <div key={item._id} className={styles.elemProduct}>
                            <h3 className={styles.titleName}>{item.name}</h3>
                            <div className={styles.wrapImg}>
                                <img
                                    src={item.imgProduct[0]}
                                    alt={item.name}
                                    className={styles.img}
                                />
                            </div>

                            <button className={styles.buttonPick}>
                                Выбрать
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className={styles.flexElemForm}>Форма изменения продукта</div>
        </div>
    );
};

export default EditProduct;
