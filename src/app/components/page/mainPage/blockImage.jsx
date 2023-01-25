import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const BlockImage = ({ url, alt }) => {
    return (
        <div className={styles.flexElem}>
            <div className={styles.flexImg}>
                <img className={styles.img} src={url} alt={alt} />
            </div>
        </div>
    );
};

BlockImage.propTypes = {
    url: PropTypes.string,
    alt: PropTypes.string
};

export default BlockImage;
