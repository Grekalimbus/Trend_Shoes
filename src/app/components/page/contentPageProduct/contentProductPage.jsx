import React, { useEffect, useState } from 'react';
import FilterFirm from '../../ui/forms/filterFirm';
import FilterName from '../../ui/forms/filterName';
import FilterPrice from '../../ui/forms/filterPrice';
import styles from './index.module.css';
import CardProduct from './cardProduct';
import httpServices from '../../../services/http.service';
import { useParams } from 'react-router-dom';
import PrivateCard from '../privateCard/privateCard';

const ContentProductPage = () => {
  const { cardID } = useParams();
  const [data, setData] = useState({
    name: '',
    from: '',
    before: '',
    firm: '',
  });
  const [product, setProduct] = useState(null);
  const [dataFirm, setDataFirm] = useState(null);

  // пулл данных в состояния product/dataFirm
  useEffect(() => {
    const getDataProductAndFirm = async () => {
      try {
        const { data } = await httpServices.get('.json');
        const { product, firm } = data;
        setProduct(Object.keys(product).map((item) => product[item]));
        setDataFirm(firm);
      } catch (error) {
        console.log('expectedErrors');
      }
    };

    getDataProductAndFirm();
  }, []);

  // функция переданная в формы, которая меняет состояние data
  const getValueForm = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    if (target.value === 'Сортировка по бренду') {
      setData((prevState) => ({ ...prevState, [target.name]: '' }));
    }
  };
  // Фильтры
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
    const filterName = product.filter((item) => {
      if (data.name !== '') {
        return item.name.toLowerCase().includes(data.name.toLowerCase());
      } else {
        return product;
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
  const dataIdCard =
    product === null
      ? null
      : product.filter((item) => {
          return item._id === cardID;
        });

  if (product !== null) {
    return cardID !== undefined ? (
      <div>
        <PrivateCard data={dataIdCard} />
      </div>
    ) : (
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
              dataFirm={dataFirm}
            />
          </div>
          <div className={styles.blockProduct}>
            {filter().map((item) => {
              return (
                <CardProduct
                  idCard={item._id}
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  imgUrl={item.imgProduct[0]}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  } else if (product === null) {
    return <h1>Loading...</h1>;
  }
};

export default ContentProductPage;
