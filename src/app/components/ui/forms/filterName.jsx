import React from 'react';
import styles from './index.module.css';
const FilterName = () => {
  return (
    <div className={styles.blockName}>
      <div className={styles.label}>
        <label htmlFor="name">Фильтр по названию</label>
      </div>
      <div className={styles.inputDivName}>
        <input className={styles.inputName} type="text" />
      </div>
    </div>
  );
};

export default FilterName;
