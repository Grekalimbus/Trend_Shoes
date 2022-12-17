import React from "react";
import PropTypes from "prop-types";

const Form = ({
    name,
    value,
    handleChangeForm,
    styles,
    label,
    error,
    type
}) => {
    return (
        <div className={styles.blockForm}>
            <label htmlFor="user" className={styles.label}>
                {label}
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <input
                type={type}
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
Form.defaultProps = {
    type: "text"
};

Form.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    handleChangeForm: PropTypes.func,
    styles: PropTypes.object,
    error: PropTypes.string,
    type: PropTypes.string
};

export default Form;
