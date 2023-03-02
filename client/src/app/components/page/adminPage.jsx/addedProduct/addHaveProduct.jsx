import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import CardHaveProduct from "./cardHaveProduct";
import { useSelector } from "react-redux";
import { getProduct } from "../../../../store/product";
import Loader from "../../../common/loader/loader";
const AddHaveProduct = () => {
    const product = useSelector(getProduct());
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
    if (quantity === null) return <Loader />;
    if (quantity) {
        return (
            <div className={styles.wrapAddHaveProduct}>
                {quantity.map((item, index) => {
                    return (
                        <CardHaveProduct
                            key={String(index) + "01"}
                            quantity={item}
                            image={product[index].imgProduct[0]}
                            id={product[index]._id}
                        />
                    );
                })}
            </div>
        );
    }
};
export default AddHaveProduct;
