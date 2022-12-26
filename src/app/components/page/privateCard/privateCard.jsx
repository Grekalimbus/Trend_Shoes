import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateCard = ({ data }) => {
    data = data[0];
    const pushArr = () => {
        const num = [];
        for (let i = 1; num.length <= 2000; i++) {
            num.push(i);
        }
        return num;
    };
    const getMouse = (div) => {
        const { target } = div;
        target.style.backgroundColor = "rgba(245, 189, 67, 0.863)";
        setTimeout(() => {
            target.style.backgroundColor = "rgb(0, 0, 0)";
        }, 700);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.blockInfo}>
                <h1>{data.name}</h1>
                <h2>id: {data._id}</h2>
                <h2>Стоимость: {data.price}</h2>
            </div>
            <div className={styles.blockDinamic}>
                <img
                    src={data.imgProduct[0]}
                    className={styles.wrapperImg}
                ></img>
                <div className={styles.innerWparrer}>
                    {pushArr().map((item) => {
                        return (
                            <div
                                key={item}
                                className={styles.cube}
                                onMouseMove={(e) => {
                                    getMouse(e);
                                }}
                            ></div>
                        );
                    })}
                </div>
            </div>
            <Link to={`/cardPage/${data._id}`}>
                <button className={styles.button}>Подробнее о товаре</button>
            </Link>
        </div>
    );
};

PrivateCard.propTypes = {
    data: PropTypes.array
};
export default PrivateCard;
