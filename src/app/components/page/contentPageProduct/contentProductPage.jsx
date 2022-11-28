import React, { useState } from 'react';
import FilterFirm from '../../ui/forms/filterFirm';
import FilterName from '../../ui/forms/filterName';
import FilterPrice from '../../ui/forms/filterPrice';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import CardProduct from './cardProduct';
import api from '../../../api/index';

const ContentProductPage = () => {
  const [data, setData] = useState({
    name: '',
    from: '',
    before: '',
    firm: '',
  });
  const products = api.product();
  const getValueForm = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    if (target.value === 'Сортировка по бренду') {
      setData((prevState) => ({ ...prevState, [target.name]: '' }));
    }
  };
  const clearName = () => {
    setData((prevState) => ({ ...prevState, name: '' }));
  };
  const clearPrice = () => {
    setData((prevState) => ({ ...prevState, from: '', before: '' }));
  };
  const clearFirm = () => {
    setData((prevState) => ({ ...prevState, firm: '' }));
  };
  const clearAll = () => {
    setData({
      name: '',
      from: '',
      before: '',
      firm: '',
    });
  };
  const clear = {
    clearName,
    clearPrice,
    clearFirm,
    clearAll,
  };
  const filter = () => {
    // =======
    const filterName = products.filter((item) => {
      if (data.name !== '') {
        return item.name.toLowerCase().includes(data.name.toLowerCase());
      } else {
        return data;
      }
    });
    // =======
    const filterPrice = filterName.filter((item) => {
      if (data.from !== '' && data.before !== '') {
        return (
          item.price >= Number(data.from) && item.price <= Number(data.before)
        );
      }
      if (data.from === '' && data.before !== '') {
        return item.price <= Number(data.before);
      }
      if (data.from !== '' && data.before === '') {
        return item.price >= Number(data.from);
      }
      if (data.from === '' && data.before === '') {
        return filterName;
      }
    });
    // =======
    const filterFirm = filterPrice.filter((item) => {
      if (data.firm !== '') {
        return item.firm === data.firm;
      } else {
        return filterPrice;
      }
    });
    return filterFirm;
  };
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
          <FilterName getValueForm={getValueForm} name={data.name} />
          <FilterPrice
            getValueForm={getValueForm}
            from={data.from}
            before={data.before}
          />
          <FilterFirm
            getValueForm={getValueForm}
            clear={clear}
            firm={data.firm}
          />
        </div>
        <div className={styles.blockProduct}>
          {filter().map((item) => {
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
