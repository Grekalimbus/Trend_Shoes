import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import CardHaveProduct from "./cardHaveProduct";
import { useApi } from "../../../hooks/useApi";
const AddHaveProduct = () => {
    const { product } = useApi();
    const [quantity, setQuantity] = useState(null);

    useEffect(() => {
        if (product) {
            const quantityArr = [];
            product.forEach((item) => {
                quantityArr.push(item.quantity);
            });
            setQuantity(quantityArr);
        }
    }, [product]);
    if (quantity === null) return <div>Loading</div>;
    if (quantity) {
        return (
            <div className={styles.wrapAddHaveProduct}>
                {quantity.map((item, index) => {
                    return (
                        <CardHaveProduct
                            key={String(index) + "01"}
                            quantity={item}
                            image={product[index].imgProduct[0]}
                        />
                    );
                })}
            </div>
        );
    }
};
export default AddHaveProduct;
