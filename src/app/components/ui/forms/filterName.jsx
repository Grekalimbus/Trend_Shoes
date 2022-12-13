import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const FilterName = ({ handleChangeForm, name }) => {
    const handleChange = ({ target }) => {
        handleChangeForm(target);
    };

    return (
        <div className={styles.blockName}>
            <div className={styles.label}>
                <label htmlFor="name">Фильтр по названию</label>
            </div>
            <div className={styles.inputDivName}>
                <input
                    className={styles.inputName}
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

FilterName.propTypes = {
    handleChangeForm: PropTypes.func,
    name: PropTypes.string
};

export default FilterName;
