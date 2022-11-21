import React from 'react';
import styles from './index.module.css';

const FilterPrice = () => {
  return (
    <div className={styles.blockPrice}>
      <div className={styles.label}>
        <label htmlFor="name">Фильтр по цене</label>
      </div>
      <div>
        <div className={styles.blockInputPrice}>
          <p className={styles.p}>От:</p>
          <input className={styles.inputPrice} type="text" />
        </div>
        <div className={styles.blockInputPrice}>
          <p className={styles.p}>До:</p>
          <input className={styles.inputPrice} type="text" />
        </div>
      </div>
    </div>
  );
};

export default FilterPrice;
