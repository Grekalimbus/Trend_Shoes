import React from "react";
import styles from "./index.module.css";
import img from "../../../../img/basket.png";

const CardBasket = () => {
    const ob = {
        firm: "dsgfnrfg78erg9043gb7t98",
        imgProduct: [
            "https://i.postimg.cc/HLHWLhfr/1-Photo-Room-4.png",
            "https://i.postimg.cc/wvqhDFsv/2-Photo-Room-3.png",
            "https://i.postimg.cc/fWgx0cWz/3-Photo-Room-4.png"
        ],
        name: "NIKE AIR MAX PLUS",
        price: 6000,
        quantity: { sizes: 40, value: 3 },
        _id: "ds9f875g9n567450f97nfgdsx"
    };

    return (
        <div className={styles.flex}>
            <div className={styles.flexSmalImg}>
                {ob.imgProduct.map((item) => {
                    return (
                        <div key={item} className={styles.smalDivImg}>
                            <img
                                src={item}
                                alt={item}
                                className={styles.smalImg}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={styles.blockBasketCard}>
                <div className={styles.elemImage}>
                    <img
                        src={ob.imgProduct[0]}
                        alt={ob.imgProduct[0]}
                        className={styles.smalImg}
                    />
                </div>
                <div className={styles.blockButtonChange}>
                    <div className={styles.elemButtonChange}>+</div>
                    <div className={styles.elemButtonChange}>0</div>
                    <div className={styles.elemButtonChange}>-</div>
                </div>
                <div className={styles.blockInfo}>
                    <div className={styles.elemInfo}>info</div>
                    <div className={styles.elemInfo}>info</div>
                    <div className={styles.elemInfo}>info</div>
                    <div className={styles.elemInfo}>info</div>
                </div>
                <div className={styles.blockDelete}>
                    <img src={img} alt="basket" className={styles.basketImg} />
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default CardBasket;
