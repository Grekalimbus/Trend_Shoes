import React, { useState } from 'react';
import FilterFirm from '../../ui/forms/filterFirm';
import FilterName from '../../ui/forms/filterName';
import FilterPrice from '../../ui/forms/filterPrice';
import styles from './index.module.css';
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
