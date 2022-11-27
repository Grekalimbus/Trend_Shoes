import React from 'react';
import styles from './index.module.css';
import api from '../../../api/index';

const FilterFirm = ({ getValueForm, clear, firm }) => {
  const handleChange = ({ target }) => {
    getValueForm(target);
  };
  return (
    <div className={styles.blockFirm}>
      <p className={styles.textCentr}>Отсортировать по бренду</p>
      <div className={styles.wrapperButtons}>
        <div className={styles.blockSelect}>
          <select
            className={`form-select ${styles.selectWrapper}`}
            aria-label="Default select example"
            value={firm}
            name="firm"
            onChange={handleChange}
          >
            <option value="">Сортировка по бренду</option>
            {Object.keys(api.brend).map((item) => {
              return (
                <option
                  key={item}
                  value={api.brend[item]}
                  className={styles.option}
                >
                  {api.brend[item]}
                </option>
              );
            })}
          </select>
        </div>
        <button className={styles.clearSort} onClick={clear.clearName}>
          Очистить сортировку по названию
        </button>
        <button className={styles.clearSort} onClick={clear.clearPrice}>
          Очистить сортировку по цене
        </button>
        <button className={styles.clearSort} onClick={clear.clearFirm}>
          Очистить сортировку бренду
        </button>
        <button className={styles.clearSort} onClick={clear.clearAll}>
          Очистить сортировку полностью
        </button>
      </div>
    </div>
  );
};

export default FilterFirm;
