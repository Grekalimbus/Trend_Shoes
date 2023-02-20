import React from "react";
import styles from "./index.module.css";

const BlockTitle = () => {
    return (
        <div className={styles.title}>
            <p className={styles.smalTitle}>
                Приветствуем тебя, наш дорогой покупатель
            </p>
            <p className={styles.smalTitle}>
                Мы рады, что ты выбрал наш магазин. Здесь ты можешь найти
                брендовую обувь разных фирм.
            </p>
            <p className={styles.smalTitle}>
                Lakai / Reebok / Adidas / Nike / NEW BALANCE
            </p>
            <p className={styles.smalTitle}>
                Если ты хочешь посмотреть ассортимент товара, нажми на
                {`"Перейти в магазин"`}
            </p>
            <p className={styles.smalTitle}>
                Современная обувь 2010-х годов сильно различается по стилю и
                стоимости. Некоторые виды обуви, изготовленные известными
                дизайнерами, могут быть изготовлены из дорогих материалов и
                продаваться за сотни или даже тысячи долларов за пару. В 2010-х
                годах она все чаще изготавливается из резины, пластмассы и
                других материалов, полученных из нефтехимии.
            </p>
        </div>
    );
};

export default BlockTitle;
