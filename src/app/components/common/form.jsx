import React from "react";
import PropTypes from "prop-types";

const Form = ({ name, value, handleChangeForm, styles, label }) => {
    return (
        <div className={styles.blockForm}>
            <label htmlFor="user" className={styles.label}>
                {label}
            </label>
            <input
                type="text"
                name={name}
                value={value}
                className={styles.input}
                onChange={(e) => {
                    handleChangeForm(e);
                }}
            />
        </div>
    );
};

Form.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    handleChangeForm: PropTypes.func,
    styles: PropTypes.object
};

export default Form;
