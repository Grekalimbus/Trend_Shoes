import React from "react";
import styles from "./index.module.css";
import CardProduct from "../../common/cardProduct";
import productService from "../../../services/product.service";
import { useSelector } from "react-redux";
import { getProduct } from "../../../store/product";

const DeleteProduct = () => {
    const product = useSelector(getProduct());
    const { remove } = productService;
    const handleDeletProduct = async (id) => {
        // const filterProduct = product.filter((item) => item._id !== id);
        // const updatedDataProduct = {};
        // filterProduct.forEach((item) => {
        //     updatedDataProduct[item._id] = item;
        // });
        try {
            await remove({ id });
            localStorage.setItem("storageBasket", "[]");
            localStorage.setItem("dataSizes", "[]");
            // window.location.reload();
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
