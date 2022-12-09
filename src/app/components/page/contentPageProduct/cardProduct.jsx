import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const CardProduct = ({ name, imgUrl, price, idCard }) => {
  return (
    <div className={styles.cardProduct}>
      <div className={styles.imgContent}>
        <img className={styles.img} src={imgUrl} alt={name} />
      </div>
      <div className={styles.contentTitle}>
        <h3>{name}</h3>
        <h3>Стоимость: {price} ₽</h3>
        <div className={styles.buttonCard}>
          <Link to={`/productPage/${idCard}`}>
            <button className={styles.buttonTitle}>Открыть карточку</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
