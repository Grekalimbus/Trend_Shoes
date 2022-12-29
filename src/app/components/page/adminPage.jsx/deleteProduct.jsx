import React from "react";
import styles from "./index.module.css";
import { useApi } from "../../hooks/useApi";
import CardProduct from "../contentPageProduct/cardProduct";

const DeleteProduct = () => {
    const { product, handleDeleteProduct } = useApi();
    const handleDeletProduct = async (id) => {
        const filterProduct = product.filter((item) => item._id !== id);
        try {
            await handleDeleteProduct(filterProduct);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    return product === null ? (
        <div>Loading</div>
    ) : (
        <div className={styles.wrapDeletePage}>
            {product.map((item) => {
                return (
                    <CardProduct
                        key={item._id}
                        name={item.name}
                        imgUrl={item.imgProduct[0]}
                        price={item.price}
                        idCard={item._id}
                        buttonTitle={"Удалить товар"}
                        handleDeletProduct={handleDeletProduct}
                    />
                );
            })}
        </div>
    );
};

export default DeleteProduct;
