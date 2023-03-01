import React, { useState } from "react";
import FilterFirm from "../../ui/forms/filterFirm";
import FilterName from "../../ui/forms/filterName";
import FilterPrice from "../../ui/forms/filterPrice";
import styles from "./index.module.css";
import CardProduct from "../../common/cardProduct";
import { useParams } from "react-router-dom";
import filtersMethod from "../../../utils/filterProduct";
import { useSelector } from "react-redux";
import { getFirm } from "../../../store/firm";
import { getProduct } from "../../../store/product";
import formClearServices from "../../../services/formClear.service";

const ContentProductPage = () => {
    const { cardID } = useParams();
    const product = useSelector(getProduct());
    const [data, setData] = useState({
        name: "",
        from: "",
        before: "",
        firm: ""
    });
    const dataFirm = useSelector(getFirm());

    const handleChangeForm = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        if (target.value === "Сортировка по бренду") {
            setData((prevState) => ({ ...prevState, [target.name]: "" }));
        }
    };

    const clearName = () => formClearServices.clearName(setData);
    const clearPrice = () => formClearServices.clearPrice(setData);
    const clearFirm = () => formClearServices.clearFirm(setData);
    const clearAll = () => formClearServices.clearAll(setData);
    const clear = {
        clearName,
        clearPrice,
        clearFirm,
        clearAll
    };
    return !product ? (
        <div>Loading</div>
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
};

export default ContentProductPage;
