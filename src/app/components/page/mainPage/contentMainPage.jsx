import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import BlockImage from "./blockImage";
import BlockTitle from "./blockTitle";

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
                        <BlockImage
                            url={
                                "https://i.postimg.cc/c12JBVMg/1-gu-RFa4-L27-transformed.png"
                            }
                            alt={"image1"}
                        />
                        <BlockImage
                            url={
                                "https://i.postimg.cc/4y2sL203/1-Photo-Room.png"
                            }
                            alt={"image2"}
                        />
                        <BlockImage
                            url={"https://i.postimg.cc/rmTfyVpw/Photo-Room.png"}
                            alt={"image3"}
                        />
                        <BlockImage
                            url={
                                "https://i.postimg.cc/HLHWLhfr/1-Photo-Room-4.png"
                            }
                            alt={"image4"}
                        />
                    </div>
                </div>
                <BlockTitle />
            </div>
        </div>
    );
};

export default ContentMainPage;
