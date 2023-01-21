import React from "react";
import styles from "./index.module.css";
import { useApi } from "../../hooks/useApi";
import CardProduct from "../../common/cardProduct";
import productService from "../../../services/product.service";

const DeleteProduct = () => {
    const { product } = useApi();
    const { remove } = productService;
    const handleDeletProduct = async (id) => {
        const filterProduct = product.filter((item) => item._id !== id);
        const updatedDataProduct = {};
        filterProduct.forEach((item) => {
            updatedDataProduct[item._id] = item;
        });
        try {
            await remove(updatedDataProduct);
            localStorage.removeItem("storageBasket");
            localStorage.removeItem("dataSizes");
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
