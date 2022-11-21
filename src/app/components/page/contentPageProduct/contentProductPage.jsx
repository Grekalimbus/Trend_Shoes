import React from 'react';
import FilterFirm from '../../ui/forms/filterFirm';
import FilterName from '../../ui/forms/filterName';
import FilterPrice from '../../ui/forms/filterPrice';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import CardProduct from './cardProduct';
import api from '../../../api/index';

const ContentProductPage = () => {
  const products = api.product();
  return (
    <div>
      <div className={styles.svg}>
        <Link to="/mainPage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10%"
            height="10%"
            fill="currentColor"
            className="bi bi-house-door"
            viewBox="0 0 16 16"
            color="white"
          >
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
          </svg>
        </Link>
      </div>

      <div className={styles.flex}>
        <div className={styles.flexForms}>
          <FilterName />
          <FilterPrice />
          <FilterFirm />
        </div>
        <div className={styles.blockProduct}>
          {products.map((item) => {
            return (
              <CardProduct
                key={item.id}
                name={item.name}
                price={item.price}
                imgUrl={item.imgProcut[0]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentProductPage;
