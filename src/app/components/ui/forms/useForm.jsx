import React, { useState } from 'react';

const useForm = (getValueForm) => {
  const [data, setData] = useState('');
  const handleChange = ({ target }) => {
    setData(target.value);
    console.log(data);
    getValueForm(data);
  };

  return { data, handleChange };
};

export default useForm;
