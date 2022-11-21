import React from 'react';
import FilterFirm from '../../ui/forms/filterFirm';
import FilterName from '../../ui/forms/filterName';
import FilterPrice from '../../ui/forms/filterPrice';
import styles from './index.module.css';
const ContentProductPage = () => {
  return (
    <div className={styles.flex}>
      <div className={styles.flexForms}>
        <FilterName />
        <FilterPrice />
        <FilterFirm />
      </div>
      <div>OOO</div>
    </div>
  );
};

export default ContentProductPage;
