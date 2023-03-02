import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";
import Loader from "../../common/loader/loader";

const BlockImg = ({ image }) => {
    const [dataImage, setDataImage] = useState(null);
    useEffect(() => {
        setDataImage(image[0]);
    }, [image]);
    const getUrlImage = ({ target }) => {
        setDataImage(target.src);
    };
    return !dataImage && !image ? (
        <Loader />
    ) : (
        <div>
            <div className={styles.mainImg}>
                <img src={dataImage} alt="mainImage" className={styles.image} />
            </div>
            <div className={styles.flexImage}>
                {image.map((img) => {
                    return (
                        <div
                            key={img}
                            className={
                                img === dataImage
                                    ? styles.divImageActive
                                    : styles.divImage
                            }
                            onClick={(e) => {
                                getUrlImage(e);
                            }}
                        >
                            <img src={img} alt={img} className={styles.image} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

BlockImg.propTypes = {
    image: PropTypes.array
};

export default BlockImg;
