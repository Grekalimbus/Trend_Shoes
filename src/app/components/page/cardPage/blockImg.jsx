import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";

const BlockImg = ({ image }) => {
    const [dataImage, setDataImage] = useState(null);
    useEffect(() => {
        setDataImage(image[0]);
    }, [image]);
    const getUrlImage = ({ target }) => {
        setDataImage(target.src);
    };

    return dataImage === null ? (
        <h1>loading...</h1>
    ) : (
        <div>
            <img src={dataImage} alt="mainImage" className={styles.mainImg} />
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
                            <img
                                src={img}
                                alt={img}
                                className={styles.imageSmall}
                            />
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
