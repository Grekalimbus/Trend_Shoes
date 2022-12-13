import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const FilterPrice = ({ handleChangeForm, from, before }) => {
    const handleChange = ({ target }) => {
        handleChangeForm(target);
    };

    return (
        <div className={styles.blockPrice}>
            <div className={styles.label}>
                <label htmlFor="name">Фильтр по цене</label>
            </div>
            <div>
                <div className={styles.blockInputPrice}>
                    <p className={styles.p}>От:</p>
                    <input
                        className={styles.inputPrice}
                        type="text"
                        name="from"
                        value={from}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.blockInputPrice}>
                    <p className={styles.p}>До:</p>
                    <input
                        className={styles.inputPrice}
                        type="text"
                        name="before"
                        value={before}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

FilterPrice.propTypes = {
    handleChangeForm: PropTypes.func,
    from: PropTypes.string,
    before: PropTypes.string
};

export default FilterPrice;
