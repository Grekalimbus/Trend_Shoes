import React from "react";
import styles from "./mainPage.module.css";
import { Link } from "react-router-dom";
const ContentMainPage = () => {
    return (
        <div className={styles.wrapp}>
            <div className={styles.flexWrap}>
                <div className={styles.contentWrapp}>
                    <h3 className={styles.h3}>
                        Чтобы посмотреть все товары, перейдите в магазин по
                        кнопке ниже
                    </h3>
                    <Link to="/productPage" className={styles.button}>
                        <div>
                            <p className={styles.p}>Перейти в магазин</p>
                        </div>
                    </Link>

                    <div className={styles.flex}>
                        <div className={styles.flexElem}>
                            <div className={styles.flexImg}>
                                <img
                                    className={styles.img}
                                    src="https://i.postimg.cc/c12JBVMg/1-gu-RFa4-L27-transformed.png"
                                    alt="image1"
                                />
                            </div>
                        </div>
                        <div className={styles.flexElem}>
                            <div className={styles.flexImg}>
                                <img
                                    className={styles.img}
                                    src="https://i.postimg.cc/4y2sL203/1-Photo-Room.png"
                                    alt="image2"
                                />
                            </div>
                        </div>
                        <div className={styles.flexElem}>
                            <div className={styles.flexImg}>
                                <img
                                    className={styles.img}
                                    src="https://i.postimg.cc/rmTfyVpw/Photo-Room.png"
                                    alt="image3"
                                />
                            </div>
                        </div>
                        <div className={styles.flexElem}>
                            <div className={styles.flexImg}>
                                <img
                                    className={styles.img}
                                    src="https://i.postimg.cc/HLHWLhfr/1-Photo-Room-4.png"
                                    alt="image4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.title}>
                    <p className={styles.smalTitle}>
                        Приветствуем тебя, наш дорогой покупатель
                    </p>
                    <p className={styles.smalTitle}>
                        Мы рады, что ты выбрал наш магазин. Здесь ты можешь
                        найти брендовую обувь разных фирм.
                    </p>
                    <p className={styles.smalTitle}>
                        Lakai / Reebok / Adidas / Nike / NEW BALANCE
                    </p>
                    <p className={styles.smalTitle}>
                        Если ты хочешь посмотреть ассортимент товара, нажми на
                        {`"Перейти в магазин"`}
                    </p>
                    <p className={styles.smalTitle}>
                        Современная обувь 2010-х годов сильно различается по
                        стилю и стоимости. Некоторые виды обуви, изготовленные
                        известными дизайнерами, могут быть изготовлены из
                        дорогих материалов и продаваться за сотни или даже
                        тысячи долларов за пару. В 2010-х годах она все чаще
                        изготавливается из резины, пластмассы и других
                        материалов, полученных из нефтехимии
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContentMainPage;
