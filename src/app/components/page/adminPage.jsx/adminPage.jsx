import React from "react";
import styles from "./index.module.css";
import { Link, useParams } from "react-router-dom";
import StatisticPage from "./statisticsPage";
import Purchases from "../../common/purchasesPage/purchases";
import { useApi } from "../../hooks/useApi";
import EditProduct from "./editProduct";
import DeleteProduct from "./deleteProduct";
import AddProductPage from "./addProductPage";
import AddHaveProduct from "./addedProduct/addHaveProduct";
import AddFirm from "./addedProduct/addFirm";
import AddNewProduct from "./addedProduct/addNewProduct";

const AdminPage = () => {
    const { allHistoryPurchases } = useApi();
    const { other } = useParams();

    if (other === undefined) {
        return (
            <div className={styles.wrap}>
                <Link to="/adminPage/statistic" className={styles.flexElem}>
                    Статистика
                </Link>
                <Link to="/adminPage/delete" className={styles.flexElem}>
                    Удаление товаров
                </Link>
                <Link to="/adminPage/edit" className={styles.flexElem}>
                    Редактирование товаров
                </Link>
                <Link to="/adminPage/add" className={styles.flexElem}>
                    Добавление товаров
                </Link>
                <Link to="/adminPage/history" className={styles.flexElem}>
                    Офомрленные заказы
                </Link>
            </div>
        );
    }
    if (other === "statistic") {
        return <StatisticPage />;
    }
    if (other === "delete") {
        return <DeleteProduct />;
    }
    if (other === "edit") {
        return <EditProduct />;
    }
    if (other === "add") {
        return <AddProductPage />;
    }
    if (other === "history") {
        return <Purchases allHistory={allHistoryPurchases} />;
    }
    if (other === "addHaveProduct") {
        return <AddHaveProduct />;
    }
    if (other === "addFirm") {
        return <AddFirm />;
    }
    if (other === "addNewProduct") {
        return <AddNewProduct />;
    }
};

export default AdminPage;
