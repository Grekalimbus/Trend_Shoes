import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const FilterFirm = ({ handleChangeForm, clear, firm, dataFirm }) => {
    const handleChange = ({ target }) => {
        handleChangeForm(target);
    };
    return (
        <div className={styles.blockFirm}>
            <p className={styles.textCentr}>Отсортировать по бренду</p>
            <div className={styles.wrapperButtons}>
                <div className={styles.blockSelect}>
                    <select
                        className={`form-select ${styles.selectWrapper}`}
                        aria-label="Default select example"
                        value={firm}
                        name="firm"
                        onChange={handleChange}
                    >
                        <option value="">Сортировка по бренду</option>
                        {Object.keys(dataFirm).map((item) => {
                            return (
                                <option
                                    key={item}
                                    value={item}
                                    className={styles.option}
                                >
                                    {dataFirm[item].name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <button className={styles.clearSort} onClick={clear.clearName}>
                    Очистить сортировку по названию
                </button>
                <button className={styles.clearSort} onClick={clear.clearPrice}>
                    Очистить сортировку по цене
                </button>
                <button className={styles.clearSort} onClick={clear.clearFirm}>
                    Очистить сортировку бренду
                </button>
                <button className={styles.clearSort} onClick={clear.clearAll}>
                    Очистить сортировку полностью
                </button>
            </div>
        </div>
    );
};

FilterFirm.propTypes = {
    handleChangeForm: PropTypes.func,
    clear: PropTypes.object,
    firm: PropTypes.string,
    dataFirm: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default FilterFirm;
