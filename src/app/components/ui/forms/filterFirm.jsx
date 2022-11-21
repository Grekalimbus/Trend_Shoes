import React from 'react';
import styles from './index.module.css';
import api from '../../../api/index';
const FilterFirm = () => {
  return (
    <div className={styles.blockFirm}>
      <p className={styles.textCentr}>Отсортировать по бренду</p>
      <div className={styles.wrapperButtons}>
        {Object.keys(api.brend).map((item) => {
          return (
            <div key={item} className={styles.brendButton}>
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterFirm;
