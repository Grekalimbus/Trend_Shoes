import React, { useState } from "react";
import FilterFirm from "../../ui/forms/filterFirm";
import FilterName from "../../ui/forms/filterName";
import FilterPrice from "../../ui/forms/filterPrice";
import styles from "./index.module.css";
import CardProduct from "../../common/cardProduct";
import { useParams } from "react-router-dom";
import PrivateCard from "../privateCard/privateCard";
import filtersMethod from "../../../utils/filterProduct";
import { useApi } from "../../hooks/useApi";

const ContentProductPage = () => {
    const { cardID } = useParams();
    const { product, dataFirm } = useApi();
    const [data, setData] = useState({
        name: "",
        from: "",
        before: "",
        firm: ""
    });

    // функция переданная в формы, которая меняет состояние data
    const handleChangeForm = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        if (target.value === "Сортировка по бренду") {
            setData((prevState) => ({ ...prevState, [target.name]: "" }));
        }
    };

    const clearName = () => {
        setData((prevState) => ({ ...prevState, name: "" }));
    };
    const clearPrice = () => {
        setData((prevState) => ({ ...prevState, from: "", before: "" }));
    };
    const clearFirm = () => {
        setData((prevState) => ({ ...prevState, firm: "" }));
    };
    const clearAll = () => {
        setData({
            name: "",
            from: "",
            before: "",
            firm: ""
        });
    };
    const clear = {
        clearName,
        clearPrice,
        clearFirm,
        clearAll
    };

    if (product !== null) {
        return cardID !== undefined ? (
            <PrivateCard data={filtersMethod.filterProduct(product, cardID)} />
        ) : (
            <div>
                <div className={styles.flex}>
                    <div className={styles.flexForms}>
                        <FilterName
                            handleChangeForm={handleChangeForm}
                            name={data.name}
                        />
                        <FilterPrice
                            handleChangeForm={handleChangeForm}
                            from={data.from}
                            before={data.before}
                        />
                        <FilterFirm
                            handleChangeForm={handleChangeForm}
                            clear={clear}
                            firm={data.firm}
                            dataFirm={dataFirm}
                        />
                    </div>
                    <div className={styles.blockProduct}>
                        {filtersMethod.filter(product, data).map((item) => {
                            return (
                                <CardProduct
                                    idCard={item._id}
                                    key={item._id}
                                    name={item.name}
                                    price={item.price}
                                    imgUrl={item.imgProduct[0]}
                                    buttonTitle={"Открыть карточку"}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default ContentProductPage;
